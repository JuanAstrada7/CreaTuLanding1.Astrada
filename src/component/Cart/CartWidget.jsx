import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom'; 
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
      <img src="/ruta/al/icono-carrito.png" alt="Carrito" />
      {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
    </div>
  );
};

export default CartWidget;