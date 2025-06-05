import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../ProductCard/ProductCard';
import { useCart } from '../../context/CartContext';
import products from '../../data/products'; // Importa el array de productos
import './ItemListContainer.css';

const ItemListContainer = ({ greetings }) => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const { categoryId } = useParams();

  useEffect(() => {
    setLoading(true);
    let data = products;
    if (categoryId) {
      data = products.filter(product => product.category === categoryId);
    }
    setFilteredProducts(data);
    setLoading(false);
  }, [categoryId]);

  if (loading) {
    return <div>Cargando productos...</div>;
  }

  return (
    <div className="item-list-container">
      <h2>{greetings}</h2>
      <div className="products-grid">
        {filteredProducts.map(product => (
          <ProductCard 
            key={product.id}
            product={product}
            onAddToCart={addToCart}
          />
        ))}
      </div>
    </div>
  );
};

export default ItemListContainer;