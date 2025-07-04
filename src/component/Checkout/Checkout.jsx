import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import './Checkout.css';

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const [orderId, setOrderId] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const [loading, setLoading] = useState(false);

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
      total: cart.reduce((acc, item) => acc + item.price * item.quantity, 0)
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
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <h2>Finalizar compra</h2>
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