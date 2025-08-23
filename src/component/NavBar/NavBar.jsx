import React from 'react';
import './NavBar.css';
import CartWidget from '../Cart/CartWidget';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const NavBar = () => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img src="/src/assets/images.png" alt="Capricho Pastelería" className="logo-img" />
          Capricho Pastelería
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Inicio</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/productos">Productos</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contacto">Contacto</Link>
            </li>
          </ul>
          <div className="navbar-nav">
            {user ? (
              <>
                <span className="navbar-text me-3">
                  Hola, {user.displayName || user.email}
                </span>
                <Link className="nav-link me-2" to="/mis-ordenes">
                  Mis Órdenes
                </Link>
                <button 
                  onClick={handleLogout}
                  className="btn btn-outline-secondary me-2"
                >
                  Cerrar Sesión
                </button>
              </>
            ) : (
              <>
                <Link className="nav-link" to="/login">Iniciar Sesión</Link>
                <Link className="nav-link" to="/register">Registrarse</Link>
              </>
            )}
            <CartWidget />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;