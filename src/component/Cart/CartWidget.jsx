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
    <div className="cart-widget clickable" onClick={handleClick} title={totalItems > 0 ? `${totalItems} productos en el carrito` : 'Carrito vacío'}>
      <FaShoppingCart className="cart-icon" />
      {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
    </div>
  );
};

export default CartWidget;