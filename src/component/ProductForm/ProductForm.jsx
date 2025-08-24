import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, addDoc, updateDoc, collection } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import './ProductForm.css';

const ProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: 'tortas',
    stock: '',
    image: ''
  });

  const categories = [
    { value: 'tortas', label: 'Tortas' },
    { value: 'cupcakes', label: 'Cupcakes' },
    { value: 'tartas', label: 'Tartas' }
  ];

  useEffect(() => {
    if (id) {
      fetchProduct();
    }
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const docRef = doc(db, 'productos', id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        setProduct({
          name: docSnap.data().name || '',
          description: docSnap.data().description || '',
          price: docSnap.data().price || '',
          category: docSnap.data().category || 'tortas',
          stock: docSnap.data().stock || '',
          image: docSnap.data().image || ''
        });
      }
    } catch (error) {
      console.error('Error al cargar producto:', error);
      alert('Error al cargar el producto');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!product.name || !product.description || !product.price || !product.image) {
      alert('Por favor completa todos los campos obligatorios');
      return;
    }

    try {
      setSaving(true);
      
      const productData = {
        name: product.name,
        description: product.description,
        price: Number(product.price),
        category: product.category,
        stock: Number(product.stock),
        image: product.image
      };

      if (id) {
        // Actualizar producto existente
        await updateDoc(doc(db, 'productos', id), productData);
        alert('Producto actualizado correctamente');
      } else {
        // Agregar nuevo producto
        await addDoc(collection(db, 'productos'), {
          ...productData,
          id: Date.now() // ID temporal para compatibilidad
        });
        alert('Producto agregado correctamente');
      }
      
      navigate('/admin/products');
    } catch (error) {
      console.error('Error al guardar producto:', error);
      alert('Error al guardar el producto');
    } finally {
      setSaving(false);
    }
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

  return (
    <div className="product-form-container">
      <div className="container">
        <div className="form-header">
          <h1>{id ? 'Editar Producto' : 'Agregar Nuevo Producto'}</h1>
          <Link to="/admin/products" className="btn btn-secondary">
            ← Volver a Productos
          </Link>
        </div>

        <div className="form-card">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="name">Nombre del Producto *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={product.name}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="description">Descripción *</label>
                  <textarea
                    id="description"
                    name="description"
                    value={product.description}
                    onChange={handleChange}
                    className="form-control"
                    rows="4"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="category">Categoría</label>
                  <select
                    id="category"
                    name="category"
                    value={product.category}
                    onChange={handleChange}
                    className="form-control"
                  >
                    {categories.map(cat => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="price">Precio *</label>
                  <div className="input-group">
                    <span className="input-group-text">$</span>
                    <input
                      type="number"
                      id="price"
                      name="price"
                      value={product.price}
                      onChange={handleChange}
                      className="form-control"
                      min="0"
                      step="0.01"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="stock">Stock</label>
                  <input
                    type="number"
                    id="stock"
                    name="stock"
                    value={product.stock}
                    onChange={handleChange}
                    className="form-control"
                    min="0"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="image">URL de la Imagen *</label>
                  <input
                    type="url"
                    id="image"
                    name="image"
                    value={product.image}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>

                {product.image && (
                  <div className="image-preview">
                    <label>Vista Previa:</label>
                    <img 
                      src={product.image} 
                      alt="Vista previa" 
                      className="preview-image"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'block';
                      }}
                    />
                    <div className="image-error" style={{display: 'none'}}>
                      Error al cargar la imagen
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="form-actions">
              <button
                type="button"
                onClick={() => navigate('/admin/products')}
                className="btn btn-secondary"
                disabled={saving}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={saving}
              >
                {saving ? 'Guardando...' : (id ? 'Actualizar Producto' : 'Agregar Producto')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;