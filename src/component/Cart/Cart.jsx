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
      <h4>Total: ${total}</h4>
      <button className="btn btn-secondary" onClick={clearCart}>Vaciar carrito</button>
      <Link to="/checkout" className="btn btn-success ms-2">Finalizar compra</Link>
    </div>
  );
};

export default Cart;