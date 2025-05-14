import './CartWidget.css';

const CartWidget = () => {
  return (
    <div className="cart-widget-container">
      <span className="cart-icon">🛒</span>
      <span className="cart-count">3</span>
    </div>
  );
};

export default CartWidget;
