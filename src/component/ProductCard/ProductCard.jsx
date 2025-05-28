import { useState } from 'react';
import './ProductCard.css';

const ProductCard = ({ product, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p className="price">${product.price}</p>
      <div className="quantity-controls">
        <button onClick={() => setQuantity(prev => Math.max(1, prev - 1))}>-</button>
        <span>{quantity}</span>
        <button onClick={() => setQuantity(prev => prev + 1)}>+</button>
      </div>
      <button 
        className="add-to-cart"
        onClick={() => onAddToCart({...product, quantity})}
      >
        Agregar al carrito
      </button>
    </div>
  );
};

export default ProductCard;