import React from 'react';
import { Link } from 'react-router-dom';
import bienvenidaImg from '../../assets/bienvenida.jpg';
import './Home.css';

const Home = () => (
  <div className="home-container">
    <section className="home-bienvenida">
      <h1>¡Bienvenido a Caprichos Pastelería!</h1>
      <p>Descubre nuestras tortas, cupcakes y tartas artesanales. ¡Endulza tu día con nosotros!</p>
      <img 
        src={bienvenidaImg} 
        alt="Bienvenida Caprichos Pastelería" 
        className="home-img"
      />
      <Link to="/productos" className="home-btn-productos">
        Ver catálogo de productos
      </Link>
    </section>
    <section className="home-promociones">
      <h2>Promociones del mes</h2>
      <ul>
        <li>🎂 10% de descuento en tortas de cumpleaños</li>
        <li>🧁 Combo de cupcakes: lleva 6 y paga 5</li>
        <li>🍰 Tartas artesanales con envío gratis</li>
      </ul>
    </section>
    <section className="home-nosotros">
      <h2>Sobre nosotros</h2>
      <p>
        Somos una pastelería familiar dedicada a crear momentos dulces y especiales. 
        Desde 2010, elaboramos productos artesanales con ingredientes de calidad y mucho amor. 
        Nuestro compromiso es ofrecerte sabores únicos y una atención personalizada. ¡Gracias por confiar en nosotros!
      </p>
    </section>
  </div>
);

export default Home;