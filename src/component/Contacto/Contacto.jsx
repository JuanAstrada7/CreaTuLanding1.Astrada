import React from 'react';
import './Contacto.css';

const Contacto = () => (
  <div className="contacto-container">
    <h2>Contacto</h2>
    <form className="contacto-form">
      <label>
        Nombre:
        <input type="text" name="nombre" required />
      </label>
      <label>
        Email:
        <input type="email" name="email" required />
      </label>
      <label>
        Mensaje:
        <textarea name="mensaje" rows="4" required />
      </label>
      <button type="submit">Enviar</button>
    </form>
    <div className="contacto-info">
      <p>📞 Teléfono: 1234-5678</p>
      <p>📧 Email: info@caprichospasteleria.com</p>
      <p>🏠 Dirección: Calle Dulce 123, Ciudad</p>
    </div>
  </div>
);

export default Contacto;