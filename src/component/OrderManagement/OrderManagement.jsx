import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs, doc, updateDoc, query, orderBy } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import './OrderManagement.css';

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const ordersQuery = query(collection(db, 'orders'), orderBy('date', 'desc'));
      const ordersSnapshot = await getDocs(ordersQuery);
      const ordersData = ordersSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        date: doc.data().date?.toDate() || new Date()
      }));
      setOrders(ordersData);
    } catch (error) {
      console.error('Error al cargar órdenes:', error);
      setError('Error al cargar las órdenes');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus, oldStatus) => {
    try {
      // Confirmación para estados críticos
      if (newStatus === 'cancelado' && oldStatus !== 'cancelado') {
        const confirmCancel = window.confirm('¿Estás seguro de que quieres cancelar esta orden?');
        if (!confirmCancel) return;
      }
      
      if (newStatus === 'entregado' && oldStatus !== 'entregado') {
        const confirmDeliver = window.confirm('¿Confirmas que esta orden ha sido entregada?');
        if (!confirmDeliver) return;
      }

      await updateDoc(doc(db, 'orders', orderId), {
        status: newStatus,
        updatedAt: new Date(),
        statusHistory: [{
          status: newStatus,
          timestamp: new Date(),
          previousStatus: oldStatus
        }]
      });

      setOrders(orders.map(order =>
        order.id === orderId
          ? { ...order, status: newStatus, updatedAt: new Date() }
          : order
      ));

      // Mensajes específicos por estado
      const messages = {
        'pendiente': 'Orden marcada como pendiente',
        'en_preparacion': 'Orden en preparación',
        'enviado': 'Orden marcada como enviada',
        'entregado': 'Orden marcada como entregada',
        'cancelado': 'Orden cancelada'
      };

      alert(messages[newStatus] || 'Estado actualizado correctamente');
    } catch (error) {
      console.error('Error al actualizar estado:', error);
      alert('Error al actualizar el estado de la orden');
    }
  };

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
        <div className="alert alert-danger">{error}</div>
      </div>
    );
  }

  return (
    <div className="order-management">
      <div className="container">
        <div className="header-actions">
          <h1>Gestión de Órdenes</h1>
          <div className="order-stats">
            <span className="stat-item">
              Total: <strong>{orders.length}</strong>
            </span>
            <span className="stat-item">
              Pendientes: <strong>{orders.filter(o => !o.status || o.status === 'pendiente').length}</strong>
            </span>
          </div>
        </div>

        {orders.length === 0 ? (
          <div className="no-orders">
            <p>No hay órdenes disponibles</p>
          </div>
        ) : (
          <div className="orders-container">
            {orders.map(order => (
              <div key={order.id} className="order-card">
                <div className="order-header">
                  <div className="order-info">
                    <h4>Orden #{order.id.slice(-8)}</h4>
                    <p className="order-date">
                      {order.date.toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                  <div className="order-status">
                    <select
                      value={order.status || 'pendiente'}
                      onChange={(e) => handleStatusChange(order.id, e.target.value, order.status)}
                      className={`form-select form-select-sm status-select status-${getStatusColor(order.status || 'pendiente')}`}
                    >
                      <option value="pendiente">Pendiente</option>
                      <option value="en_preparacion">En Preparación</option>
                      <option value="enviado">Enviado</option>
                      <option value="entregado">Entregado</option>
                      <option value="cancelado">Cancelado</option>
                    </select>
                  </div>
                </div>

                <div className="order-details">
                  <div className="customer-info">
                    <h5>Cliente</h5>
                    <p><strong>Nombre:</strong> {order.buyer?.name || 'N/A'}</p>
                    <p><strong>Email:</strong> {order.buyer?.email || 'N/A'}</p>
                    <p><strong>Teléfono:</strong> {order.buyer?.phone || 'N/A'}</p>
                  </div>

                  <div className="order-items">
                    <h5>Productos</h5>
                    <div className="items-list">
                      {order.items?.map((item, index) => (
                        <div key={index} className="item-row">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="item-thumbnail"
                          />
                          <div className="item-details">
                            <span className="item-name">{item.name}</span>
                            <span className="item-quantity">x{item.quantity}</span>
                            <span className="item-price">${item.price}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="order-total">
                    <h5>Total: ${order.total?.toLocaleString() || '0'}</h5>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="back-link">
          <Link to="/admin" className="btn btn-secondary">
            ← Volver al Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderManagement;