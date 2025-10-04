import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import './ItemDetail.css';

const ItemDetail = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
    setAdded(true);
  };

  const handleGoToCart = () => {
    navigate('/cart');
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

        {product.stock === 0 ? (
          <p className="sin-stock">Sin stock</p>
        ) : !added ? (
          <>
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
          </>
        ) : (
          <div className="agregado">
            <p>¡Producto agregado al carrito!</p>
            <div className="post-add-actions">
              <button className="go-to-cart" onClick={handleGoToCart}>
                Ir al carrito
              </button>
              <button 
                className="continue-shopping" 
                onClick={() => navigate('/productos')}
              >
                Seguir comprando
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ItemDetail;