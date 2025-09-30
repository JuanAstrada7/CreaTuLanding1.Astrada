import { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { collection, addDoc, Timestamp, doc, getDoc, updateDoc, increment } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import './Checkout.css';

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const { user } = useAuth();
  const [orderId, setOrderId] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setForm({
        name: user.displayName || '',
        email: user.email || '',
        phone: ''
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      for (const item of cart) {
        const productRef = doc(db, 'productos', item.id);
        const productSnap = await getDoc(productRef);
        const currentStock = productSnap.data().stock || 0;

        if (currentStock < item.quantity) {
          alert(`Stock insuficiente para ${item.name}. Disponible: ${currentStock}`);
          setLoading(false);
          return;
        }
      }

      const order = {
        buyer: form,
        items: cart,
        date: Timestamp.fromDate(new Date()),
        total: cart.reduce((acc, item) => acc + item.price * item.quantity, 0),
        userId: user?.uid || null,
        status: 'pendiente', // Estado inicial
        createdAt: Timestamp.fromDate(new Date()),
        updatedAt: Timestamp.fromDate(new Date())
      };

      const orderRef = await addDoc(collection(db, "orders"), order);

      for (const item of cart) {
        const productRef = doc(db, 'productos', item.id);
        await updateDoc(productRef, {
          stock: increment(-item.quantity)
        });
      }

      setOrderId(orderRef.id);
      clearCart();
    } catch (error) {
      console.error('Error al procesar orden:', error);
      alert("Error al generar la orden");
    } finally {
      setLoading(false);
    }
  };

  if (orderId) {
    return (
      <div className="checkout-success">
        <h2>¡Gracias por tu compra!</h2>
        <p>Tu número de orden es: <strong>{orderId}</strong></p>
        {user && (
          <p>Te enviaremos un email a {user.email} con los detalles de tu pedido.</p>
        )}
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <div className="container">
        <h2>Finalizar Compra</h2>

        <div className="checkout-content">
          <div className="order-summary">
            <h3>Resumen de tu orden</h3>
            {cart.map(item => (
              <div key={item.id} className="order-item">
                <img src={item.image} alt={item.name} />
                <div className="item-details">
                  <h4>{item.name}</h4>
                  <p>Cantidad: {item.quantity}</p>
                  <p>Precio: ${item.price}</p>
                </div>
                <div className="item-total">
                  ${item.price * item.quantity}
                </div>
              </div>
            ))}
            <div className="order-total">
              <h4>Total: ${cart.reduce((acc, item) => acc + item.price * item.quantity, 0)}</h4>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="checkout-form">
            <h3>Información de contacto</h3>

            <div className="form-group">
              <label htmlFor="name">Nombre completo *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Teléfono *</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                required
                className="form-control"
              />
            </div>

            <button
              type="submit"
              disabled={loading || cart.length === 0}
              className="btn btn-primary btn-lg w-100"
            >
              {loading ? 'Procesando...' : 'Confirmar Compra'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;