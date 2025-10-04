import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import ItemDetail from '../ItemDetail/ItemDetail';
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import './ItemDetailContainer.css';

const ItemDetailContainer = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);

    const docRef = doc(db, "productos", id);
    getDoc(docRef)
      .then(docSnap => {
        if (docSnap.exists()) {
          setProduct({ id: docSnap.id, ...docSnap.data() });
        } else {
          setProduct(null);
        }
      })
      .catch(error => {
        console.error('Error al cargar el producto:', error);
        setProduct(null);
      })
      .finally(() => {
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
      {/* Breadcrumb y navegación */}
      <div className="navigation-header">
        <nav className="breadcrumb-nav">
          <Link to="/" className="breadcrumb-link">Inicio</Link>
          <span className="breadcrumb-separator">›</span>
          <Link to="/productos" className="breadcrumb-link">Productos</Link>
          <span className="breadcrumb-separator">›</span>
          <span className="breadcrumb-current">{product?.name || 'Producto'}</span>
        </nav>
        <button 
          onClick={() => navigate(-1)} 
          className="btn-back"
          title="Volver atrás"
        >
          ← Volver
        </button>
      </div>

      {product ? <ItemDetail product={product} /> : (
        <div className="product-not-found">
          <h3>Producto no encontrado</h3>
          <p>El producto que buscas no existe o ha sido eliminado.</p>
          <Link to="/productos" className="btn-primary">Ver todos los productos</Link>
        </div>
      )}
    </div>
  );
};

export default ItemDetailContainer;