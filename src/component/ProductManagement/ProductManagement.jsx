import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs, doc, deleteDoc, getDoc } from 'firebase/firestore';
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
      console.log('=== CARGANDO PRODUCTOS ===');
      const querySnapshot = await getDocs(collection(db, 'productos'));
      const productsList = [];
      
      querySnapshot.forEach((doc) => {
        console.log('Producto encontrado:', doc.id, doc.data());
        productsList.push({
          id: doc.data().id || doc.id, // Usar el campo id interno o el ID del documento
          documentId: doc.id, // Guardar el ID real del documento
          ...doc.data()
        });
      });
      
      console.log('Total de productos cargados:', productsList.length);
      setProducts(productsList);
      setError(null);
    } catch (error) {
      console.error('Error al cargar productos:', error);
      setError('Error al cargar productos');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (productId, productName) => {
    if (window.confirm(`¿Estás seguro de que quieres eliminar "${productName}"?`)) {
      try {
        // Logs de depuración
        console.log('=== INICIANDO ELIMINACIÓN ===');
        console.log('ID original:', productId, 'Tipo:', typeof productId);
        
        // Buscar el producto en el estado para obtener el ID real del documento
        const productToDelete = products.find(p => p.id === productId);
        if (!productToDelete) {
          console.error('❌ Producto no encontrado en el estado local');
          alert('Error: Producto no encontrado');
          return;
        }
        
        // Usar el ID real del documento (no el campo id interno)
        const documentId = productToDelete.documentId || productToDelete.id;
        console.log('ID del documento a eliminar:', documentId);
        
        // Verificar que el documento existe antes de eliminar
        const docRef = doc(db, 'productos', documentId);
        console.log('Referencia del documento:', docRef.path);
        
        // Eliminar de Firestore
        await deleteDoc(docRef);
        console.log('✅ Producto eliminado de Firestore');
        
        // Verificar que realmente se eliminó
        try {
          const docSnapshot = await getDoc(docRef);
          if (docSnapshot.exists()) {
            console.error('❌ ERROR: El documento aún existe después de la eliminación');
            alert('Error: El producto no se pudo eliminar de la base de datos');
            return;
          } else {
            console.log('✅ Confirmado: El documento fue eliminado correctamente');
          }
        } catch (verifyError) {
          console.log('✅ Documento eliminado (error al verificar es normal)');
        }
        
        // Actualizar estado local
        setProducts(prev => prev.filter(product => product.id !== productId));
        console.log('✅ Estado local actualizado');
        
        alert('Producto eliminado correctamente');
      } catch (error) {
        console.error('❌ Error al eliminar producto:', error);
        console.error('Código de error:', error.code);
        console.error('Mensaje de error:', error.message);
        
        if (error.code === 'permission-denied') {
          alert('Error: No tienes permisos para eliminar productos');
        } else if (error.code === 'not-found') {
          alert('Error: El producto no existe');
        } else {
          alert(`Error: ${error.message}`);
        }
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
        <button onClick={fetchProducts} className="btn btn-primary">Reintentar</button>
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