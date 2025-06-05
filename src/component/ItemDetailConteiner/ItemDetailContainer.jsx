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
    const foundProduct = products.find(p => p.id === parseInt(id));
    setProduct(foundProduct || null);
    setLoading(false);
  }, [id]);

  if (loading) {
    return <div>Cargando producto...</div>;
  }

  return (
    <div className="item-detail-container">
      {product ? <ItemDetail product={product} /> : <p>Producto no encontrado</p>}
    </div>
  );
};

export default ItemDetailContainer;