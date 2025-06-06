import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ItemDetail from '../ItemDetail/ItemDetail';
import products from '../../data/products'; 
import './ItemDetailContainer.css';

const ItemDetailContainer = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    
    new Promise((resolve) => {
      setTimeout(() => {
        const foundProduct = products.find(p => p.id === parseInt(id));
        resolve(foundProduct || null);
      }, 1000);
    })
    .then(data => {
      setProduct(data);
      setLoading(false);
    })
    .catch(error => {
      console.error('Error al cargar el producto:', error);
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="item-detail-container">
      {product ? <ItemDetail product={product} /> : <p>Producto no encontrado</p>}
    </div>
  );
};

export default ItemDetailContainer;