import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { doc, getDoc, addDoc, updateDoc, collection } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import './ProductForm.css';

const ProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: 'tortas',
    stock: '',
    image: ''
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const IMGBB_API_KEY = import.meta.env.VITE_IMGBB_API_KEY;

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
        setImagePreview(docSnap.data().image || '');
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Por favor selecciona un archivo de imagen válido');
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        alert('La imagen debe ser menor a 5MB');
        return;
      }

      setImageFile(file);

      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadToImgBB = async (file) => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setUploading(false);
        return data.data.url;
      } else {
        throw new Error(data.error.message || 'Error al subir imagen');
      }
    } catch (error) {
      console.error('Error al subir imagen:', error);
      setUploading(false);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!product.name || !product.description || !product.price) {
      alert('Por favor completa todos los campos obligatorios');
      return;
    }

    if (!product.image && !imageFile) {
      alert('Por favor selecciona una imagen');
      return;
    }

    try {
      setSaving(true);

      let imageURL = product.image;
      if (imageFile) {
        imageURL = await uploadToImgBB(imageFile);
      }

      const productData = {
        name: product.name,
        description: product.description,
        price: Number(product.price),
        category: product.category,
        stock: Number(product.stock),
        image: imageURL
      };

      if (id) {
        await updateDoc(doc(db, 'productos', id), productData);
        alert('Producto actualizado correctamente');
      } else {
        await addDoc(collection(db, 'productos'), {
          ...productData,
          id: Date.now()
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
          <form id="product-form" onSubmit={handleSubmit}>
            {/* Sección 1: Información Básica */}
            <div className="form-section">
              <h3 className="section-title">Información Básica</h3>
              
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
                      autoComplete="on"
                      required
                      placeholder="Ej: Torta de Chocolate"
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="category">Categoría *</label>
                    <select
                      id="category"
                      name="category"
                      value={product.category}
                      onChange={handleChange}
                      className="form-control"
                      autoComplete="on"
                    >
                      {categories.map(cat => (
                        <option key={cat.value} value={cat.value}>
                          {cat.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
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
                  autoComplete="on"
                  required
                  placeholder="Describe el producto, ingredientes especiales, sabores, etc."
                />
              </div>
            </div>

            {/* Sección 2: Precio y Disponibilidad */}
            <div className="form-section">
              <h3 className="section-title">Precio y Disponibilidad</h3>
              
              <div className="row">
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
                        autoComplete="on"
                        required
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="stock">Existencias disponibles</label>
                    <input
                      type="number"
                      id="stock"
                      name="stock"
                      value={product.stock}
                      onChange={handleChange}
                      className="form-control"
                      min="0"
                      autoComplete="on"
                      placeholder="Cantidad disponible"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Sección 3: Imagen del Producto */}
            <div className="form-section">
              <h3 className="section-title">Imagen del Producto</h3>
              
              <div className="form-group">
                <label htmlFor="image">Seleccionar imagen *</label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="form-control"
                />
                <small className="form-text text-muted">
                  Máximo 5MB. Formatos soportados: JPG, PNG, GIF, WebP
                </small>

                {uploading && (
                  <div className="uploading">
                    <div className="spinner"></div>
                    <p>Subiendo imagen...</p>
                  </div>
                )}
              </div>

              {imagePreview && (
                <div className="image-preview">
                  <label>Vista previa:</label>
                  <img
                    src={imagePreview}
                    alt="Vista previa del producto"
                    className="preview-image"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'block';
                    }}
                  />
                  <div className="image-error" style={{ display: 'none' }}>
                    Error al cargar la imagen
                  </div>
                </div>
              )}
            </div>
          </form>
        </div>

        {/* Botones fuera del formulario para mejor layout */}
        <div className="form-actions">
          <button
            type="button"
            onClick={() => navigate('/admin/products')}
            className="btn btn-secondary"
            disabled={saving || uploading}
          >
            Cancelar
          </button>
          <button
            type="submit"
            form="product-form"
            className="btn btn-primary"
            disabled={saving || uploading}
          >
            {saving ? 'Guardando...' : uploading ? 'Subiendo imagen...' : (id ? 'Actualizar Producto' : 'Agregar Producto')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;