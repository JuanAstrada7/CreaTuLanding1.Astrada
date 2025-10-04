import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getUserOrders } from '../Services/firebaseService';
import './OrderHistory.css';

// Funciones para manejar estados
const getStatusColor = (status) => {
  switch (status) {
    case 'pendiente': return 'warning';
    case 'en_preparacion': return 'info';
    case 'enviado': return 'primary';
    case 'entregado': return 'success';
    case 'cancelado': return 'danger';
    default: return 'secondary';
  }
};

const getStatusLabel = (status) => {
  switch (status) {
    case 'pendiente': return 'Pendiente';
    case 'en_preparacion': return 'En Preparación';
    case 'enviado': return 'Enviado';
    case 'entregado': return 'Entregado';
    case 'cancelado': return 'Cancelado';
    default: return 'Pendiente';
  }
};

const OrderHistory = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadOrders = async () => {
      if (user) {
        setLoading(true);
        setError(null);
        try {
          const userOrders = await getUserOrders(user.uid);
          setOrders(userOrders);
        } catch (error) {
          console.error('Error al cargar órdenes:', error);
          setError('Error al cargar el historial de órdenes');
        } finally {
          setLoading(false);
        }
      }
    };

    loadOrders();
  }, [user]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="order-history-container">
      <h2>Mi Historial de Compras</h2>

      {orders.length === 0 ? (
        <div className="no-orders">
          <div className="text-center">
            <h4>No tienes órdenes aún</h4>
            <p className="text-muted">¡Comienza a comprar nuestros deliciosos productos!</p>
            <Link to="/productos" className="btn btn-primary">
              Ver productos
            </Link>
          </div>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <div>
                  <h4>Orden #{order.id.slice(-8)}</h4>
                  <span className="order-date">
                    {order.date?.toLocaleDateString('es-ES', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>
                <div className="order-status">
                  <span className={`badge bg-${getStatusColor(order.status || 'pendiente')}`}>
                    {getStatusLabel(order.status || 'pendiente')}
                  </span>
                </div>
              </div>

              <div className="order-items">
                {order.items.map((item, index) => (
                  <div key={index} className="order-item">
                    <img src={item.image} alt={item.name} className="item-image" />
                    <div className="item-details">
                      <h5>{item.name}</h5>
                      <p className="item-quantity">Cantidad: {item.quantity}</p>
                      <p className="item-price">Precio: ${item.price}</p>
                    </div>
                    <div className="item-total">
                      ${item.price * item.quantity}
                    </div>
                  </div>
                ))}
              </div>

              <div className="order-footer">
                <div className="order-total">
                  <strong>Total: ${order.total}</strong>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;