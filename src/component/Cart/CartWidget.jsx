import { useCart } from '../../context/CartContext';
import './CartWidget.css';

const CartWidget = () => {
  const { cart } = useCart();
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="cart-widget">
      <span className="cart-icon">🛒</span>
      {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
    </div>
  );
};

export default CartWidget;