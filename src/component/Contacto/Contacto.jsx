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
        <div className="form-group">
          <label htmlFor="nombre">Nombre:</label>
          <input 
            type="text" 
            id="nombre"
            name="nombre" 
            value={formData.nombre} 
            onChange={handleChange} 
            required 
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input 
            type="email" 
            id="email"
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            required 
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="mensaje">Mensaje:</label>
          <textarea 
            id="mensaje"
            name="mensaje" 
            rows="4" 
            value={formData.mensaje} 
            onChange={handleChange} 
            required 
            className="form-control"
          />
        </div>
        <button type="submit" className="btn-contacto">Enviar</button>
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