import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import './ItemDetail.css';

const ItemDetail = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({...product, quantity});
  };

  return (
    <div className="item-detail">
      <div className="item-detail-image">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="item-detail-info">
        <h2>{product.name}</h2>
        <p className="description">{product.description}</p>
        <p className="price">${product.price}</p>
        <div className="quantity-controls">
          <button onClick={() => setQuantity(prev => Math.max(1, prev - 1))}>-</button>
          <span>{quantity}</span>
          <button onClick={() => setQuantity(prev => Math.min(product.stock, prev + 1))}>+</button>
        </div>
        <button 
          className="add-to-cart"
          onClick={handleAddToCart}
          disabled={product.stock === 0}
        >
          Agregar al carrito
        </button>
      </div>
    </div>
  );
};

export default ItemDetail;