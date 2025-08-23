import { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import './Checkout.css';

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const { user } = useAuth();
  const [orderId, setOrderId] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const [loading, setLoading] = useState(false);

  // Pre-llenar formulario con datos del usuario si está autenticado
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const order = {
      buyer: form,
      items: cart,
      date: Timestamp.fromDate(new Date()),
      total: cart.reduce((acc, item) => acc + item.price * item.quantity, 0),
      userId: user?.uid || null // Agregar ID del usuario si está autenticado
    };

    addDoc(collection(db, "orders"), order)
      .then(docRef => {
        setOrderId(docRef.id);
        clearCart();
      })
      .catch(() => {
        alert("Error al generar la orden");
      })
      .finally(() => {
        setLoading(false);
      });
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
      <h2>Finalizar compra</h2>
      {user && (
        <div className="alert alert-info">
          <strong>Usuario autenticado:</strong> {user.displayName || user.email}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Nombre"
          value={form.name}
          onChange={handleChange}
          required
          autoComplete="name"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          autoComplete="email"
        />
        <input
          type="tel"
          name="phone"
          placeholder="Teléfono"
          value={form.phone}
          onChange={handleChange}
          required
          autoComplete="tel"
        />
        <button type="submit" disabled={loading}>
          {loading ? "Procesando..." : "Confirmar compra"}
        </button>
      </form>
    </div>
  );
};

export default Checkout;