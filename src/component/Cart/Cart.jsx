import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from "react-icons/fa";
import './Cart.css';

const Cart = () => {
  const { cart, removeFromCart, clearCart, increaseQuantity, decreaseQuantity } = useCart();
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="cart-container cart-empty">
        <FaShoppingCart className="cart-empty-icon" />
        <h2>¡Tu carrito está vacío!</h2>
        <p>Agrega productos para comenzar tu compra.</p>
        <Link to="/productos" className="btn btn-primary">Ver productos</Link>
      </div>
    );
  }

  return (
    <div className="cart-container">
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
                <span style={{ margin: "0 8px" }}>{item.quantity}</span>
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
      
      <h4>Total: ${total}</h4>
      <div className="cart-footer-buttons">
        <button className="btn btn-secondary" onClick={clearCart}>Vaciar carrito</button>
        <Link to="/checkout" className="btn btn-success">Finalizar compra</Link>
      </div>
    </div>
  );
};

export default Cart;