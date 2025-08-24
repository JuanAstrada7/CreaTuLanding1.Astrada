import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import './ProductManagement.css';

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const productsSnapshot = await getDocs(collection(db, 'productos'));
      const productsData = productsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProducts(productsData);
    } catch (error) {
      console.error('Error al cargar productos:', error);
      setError('Error al cargar los productos');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (productId, productName) => {
    if (window.confirm(`¿Estás seguro de que quieres eliminar "${productName}"?`)) {
      try {
        await deleteDoc(doc(db, 'productos', productId));
        setProducts(products.filter(product => product.id !== productId));
        alert('Producto eliminado correctamente');
      } catch (error) {
        console.error('Error al eliminar producto:', error);
        alert('Error al eliminar el producto');
      }
    }
  };

  const getStockStatus = (stock) => {
    if (stock === 0) return { class: 'out-of-stock', label: 'Sin Stock' };
    if (stock <= 5) return { class: 'low-stock', label: 'Stock Bajo' };
    return { class: 'in-stock', label: 'En Stock' };
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="alert alert-danger">{error}</div>
      </div>
    );
  }

  return (
    <div className="product-management">
      <div className="container">
        <div className="header-actions">
          <h1>Gestión de Productos</h1>
          <Link to="/admin/products/new" className="btn btn-success">
            ➕ Agregar Nuevo Producto
          </Link>
        </div>

        {products.length === 0 ? (
          <div className="no-products">
            <p>No hay productos disponibles</p>
            <Link to="/admin/products/new" className="btn btn-primary">
              Agregar primer producto
            </Link>
          </div>
        ) : (
          <div className="products-table-container">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Imagen</th>
                  <th>Nombre</th>
                  <th>Categoría</th>
                  <th>Precio</th>
                  <th>Stock</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {products.map(product => {
                  const stockStatus = getStockStatus(product.stock);
                  return (
                    <tr key={product.id}>
                      <td>
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="product-thumbnail"
                        />
                      </td>
                      <td>{product.name}</td>
                      <td>
                        <span className={`badge bg-${getCategoryColor(product.category)}`}>
                          {product.category}
                        </span>
                      </td>
                      <td>${product.price}</td>
                      <td>
                        <span className={`stock-badge ${stockStatus.class}`}>
                          {product.stock}
                          <small className="stock-label">({stockStatus.label})</small>
                        </span>
                      </td>
                      <td>
                        <div className="action-buttons">
                          <Link 
                            to={`/admin/products/edit/${product.id}`}
                            className="btn btn-sm btn-primary"
                          >
                            ✏️ Editar
                          </Link>
                          <button
                            onClick={() => handleDelete(product.id, product.name)}
                            className="btn btn-sm btn-danger"
                          >
                            🗑️ Eliminar
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        <div className="back-link">
          <Link to="/admin" className="btn btn-secondary">
            ← Volver al Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

const getCategoryColor = (category) => {
  switch (category) {
    case 'tortas': return 'primary';
    case 'cupcakes': return 'success';
    case 'tartas': return 'warning';
    default: return 'secondary';
  }
};

export default ProductManagement;