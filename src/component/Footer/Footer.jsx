import React from 'react';
import './Footer.css';

const Footer = () => (
  <footer className="footer">
    <p>&copy; {new Date().getFullYear()} Caprichos Pastelería. Todos los derechos reservados.</p>
    <div className="footer-links">
      <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">Instagram</a>
      <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">Facebook</a>
      <a href="mailto:info@caprichospasteleria.com" target='_blank' rel='noopener noreferrer'>Email</a>
    </div>
  </footer>
);

export default Footer;