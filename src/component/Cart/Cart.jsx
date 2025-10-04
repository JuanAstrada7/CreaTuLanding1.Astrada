import { useCart } from '../../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart } from "react-icons/fa";
import './Cart.css';

const Cart = () => {
  const { cart, removeFromCart, clearCart, increaseQuantity, decreaseQuantity } = useCart();
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="cart-container">
        {/* Header de navegación para carrito vacío */}
        <div className="cart-navigation-header">
          <nav className="breadcrumb-nav">
            <Link to="/" className="breadcrumb-link">Inicio</Link>
            <span className="breadcrumb-separator">›</span>
            <Link to="/productos" className="breadcrumb-link">Productos</Link>
            <span className="breadcrumb-separator">›</span>
            <span className="breadcrumb-current">Carrito</span>
          </nav>
          <button 
            onClick={() => navigate(-1)} 
            className="btn-back"
            title="Volver atrás"
          >
            ← Volver
          </button>
        </div>

        <div className="cart-empty">
          <FaShoppingCart className="cart-empty-icon" />
          <h2>¡Tu carrito está vacío!</h2>
          <p>Agrega productos para comenzar tu compra.</p>
          <div className="empty-cart-actions">
            <Link to="/productos" className="btn btn-primary">
              Ver productos
            </Link>
            <Link to="/" className="btn btn-outline">
              Ir al inicio
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      {/* Header de navegación */}
      <div className="cart-navigation-header">
        <nav className="breadcrumb-nav">
          <Link to="/" className="breadcrumb-link">Inicio</Link>
          <span className="breadcrumb-separator">›</span>
          <Link to="/productos" className="breadcrumb-link">Productos</Link>
          <span className="breadcrumb-separator">›</span>
          <span className="breadcrumb-current">Carrito</span>
        </nav>
        <button 
          onClick={() => navigate(-1)} 
          className="btn-back"
          title="Volver atrás"
        >
          ← Volver
        </button>
      </div>

      <h2>Carrito de compras</h2>
      
      {/* Tabla para desktop */}
      <table className="table">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Precio unitario</th>
            <th>Subtotal</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {cart.map(item => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>
                <button className="btn btn-light btn-sm" onClick={() => decreaseQuantity(item.id)} disabled={item.quantity <= 1}>-</button>
                <span className="quantity-display">{item.quantity}</span>
                <button className="btn btn-light btn-sm" onClick={() => increaseQuantity(item.id)}>+</button>
              </td>
              <td>${item.price}</td>
              <td>${item.price * item.quantity}</td>
              <td>
                <button className="btn btn-danger btn-sm" onClick={() => removeFromCart(item.id)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {/* Cards para mobile */}
      <div className="cart-mobile-cards">
        {cart.map(item => (
          <div key={item.id} className="cart-item-card">
            <div className="cart-item-name">{item.name}</div>
            <div className="cart-item-details">
              <div className="cart-item-detail">
                <strong>Precio:</strong> ${item.price}
              </div>
              <div className="cart-item-detail">
                <strong>Subtotal:</strong> ${item.price * item.quantity}
              </div>
            </div>
            <div className="cart-quantity-controls">
              <button className="btn btn-light btn-sm" onClick={() => decreaseQuantity(item.id)} disabled={item.quantity <= 1}>-</button>
              <span className="cart-quantity-display">{item.quantity}</span>
              <button className="btn btn-light btn-sm" onClick={() => increaseQuantity(item.id)}>+</button>
            </div>
            <div className="cart-item-actions">
              <button className="btn btn-danger btn-sm" onClick={() => removeFromCart(item.id)}>
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="cart-summary">
        <h4>Total: ${total}</h4>
        <p className="cart-items-count">
          {cart.length} {cart.length === 1 ? 'producto' : 'productos'} en el carrito
        </p>
      </div>
      
      <div className="cart-footer-buttons">
        <div className="cart-actions-left">
          <Link to="/productos" className="btn btn-continue-shopping">
            Seguir comprando
          </Link>
          <button className="btn btn-secondary" onClick={clearCart}>
            Vaciar carrito
          </button>
        </div>
        <div className="cart-actions-right">
          <Link to="/checkout" className="btn btn-success btn-checkout">
            Finalizar compra
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;