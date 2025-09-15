import React, { useState } from 'react';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import './Contacto.css';

const Contacto = () => {
  const [formData, setFormData] = useState({ nombre: '', email: '', mensaje: '' });
  const [mensaje, setMensaje] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje('');
    try {
      await addDoc(collection(db, 'contacto'), {
        ...formData,
        fecha: Timestamp.now()
      });
      setMensaje('¡Mensaje enviado correctamente!');
      setFormData({ nombre: '', email: '', mensaje: '' });
    } catch (error) {
      setMensaje('Error al enviar el mensaje.');
    }
  };

  return (
    <div className="contacto-container">
      <h2>Contacto</h2>
      <form className="contacto-form" onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required />
        </label>
        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </label>
        <label>
          Mensaje:
          <textarea name="mensaje" rows="4" value={formData.mensaje} onChange={handleChange} required />
        </label>
        <button type="submit">Enviar</button>
      </form>
      {mensaje && <p className="contacto-mensaje">{mensaje}</p>}
      <div className="contacto-info">
        <p>📞 Teléfono: 1234-5678</p>
        <p>📧 Email: info@caprichospasteleria.com</p>
        <p>🏠 Dirección: Calle Dulce 123, Ciudad</p>
      </div>
    </div>
  );
};

export default Contacto;