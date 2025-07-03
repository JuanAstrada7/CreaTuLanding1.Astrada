import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../ProductCard/ProductCard';
import SearchBar from '../SearchBar/SearchBar';
import { useCart } from '../../context/CartContext';
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import './ItemListContainer.css';

const ItemListContainer = ({ greetings }) => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();
  const { categoryId, searchTerm } = useParams();

  useEffect(() => {
    setLoading(true);
    setError(null);

    const productsCollection = collection(db, "productos");
    getDocs(productsCollection)
      .then(productsSnapshot => {
        let data = productsSnapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id
        }));

        if (categoryId && categoryId !== 'todos') {
          data = data.filter(product => product.category === categoryId);
        }

        if (searchTerm) {
          const searchLower = searchTerm.toLowerCase();
          data = data.filter(product =>
            product.name.toLowerCase().includes(searchLower) ||
            product.description.toLowerCase().includes(searchLower)
          );
        }

        setFilteredProducts(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error al cargar productos:', error);
        setError('Ocurrió un error al cargar los productos.');
        setLoading(false);
      });
  }, [categoryId, searchTerm]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p>Cargando productos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-message">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="item-list-container">
      <SearchBar />
      <h2>
        {greetings ||
          (searchTerm ? `Resultados para: ${searchTerm}` :
            categoryId && categoryId !== 'todos' ? `Productos - ${categoryId}` :
              'Todos los productos')}
      </h2>
      {filteredProducts.length === 0 ? (
        <p className="no-products">
          {searchTerm ?
            `No se encontraron productos para "${searchTerm}"` :
            'No hay productos disponibles en esta categoría'}
        </p>
      ) : (
        <div className="products-grid">
          {filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={addToCart}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ItemListContainer;