import React from 'react';
import './NavBar.css';
import CartWidget from '../Cart/CartWidget';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const NavBar = () => {
  const { user, userRole, loading, logout } = useAuth();

  console.log('NavBar - Usuario:', user);
  console.log('NavBar - Rol del usuario:', userRole);
  console.log('NavBar - Loading:', loading);

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
            {userRole === 'admin' && (
              <li className="nav-item">
                <Link className="nav-link" to="/admin">Administración</Link>
              </li>
            )}
          </ul>
          <div className="navbar-nav">
            {user ? (
              <>
                <span className="navbar-text me-3">
                  Hola, {user.displayName || user.email}
                  {userRole === 'admin' && <span className="badge bg-warning ms-2">Admin</span>}
                </span>
                <Link className="nav-link me-2" to="/mis-ordenes">
                  Mis Órdenes
                </Link>
                <button
                  onClick={handleLogout}
                  className="btn btn-outline-secondary me-2 btn-logout"
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