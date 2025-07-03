import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { FaShoppingCart } from "react-icons/fa";
import './CartWidget.css';

const CartWidget = () => {
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/cart');
  };

  return (
    <div className="cart-widget" onClick={handleClick} style={{ cursor: 'pointer' }}>
      <FaShoppingCart className="cart-icon" />
      {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
    </div>
  );
};

export default CartWidget;