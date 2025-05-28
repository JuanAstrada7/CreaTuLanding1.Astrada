import { useState, useEffect } from 'react';
import ProductCard from '../ProductCard/ProductCard';
import { useCart } from '../../context/CartContext';
import './ItemListContainer.css';

const ItemListContainer = ({ greetings }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    
    const sampleProducts = [
      {
        id: 1,
        name: "Torta de Chocolate",
        price: 2500,
        image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&auto=format&fit=crop&q=60",
        description: "Deliciosa torta de chocolate"
      },
      {
        id: 2,
        name: "Cupcakes",
        price: 1500,
        image: "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=500&auto=format&fit=crop&q=60",
        description: "Cupcakes decorados"
      },
      {
        id: 3,
        name: "Torta de Frutas",
        price: 2800,
        image: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=500&auto=format&fit=crop&q=60",
        description: "Torta con frutas frescas"
      },
      {
        id: 4,
        name: "Tartas",
        price: 1800,
        image: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=500&auto=format&fit=crop&q=60",
        description: "Tartas caseras"
      }
    ];

    setProducts(sampleProducts);
    setFilteredProducts(sampleProducts);
  }, []);

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