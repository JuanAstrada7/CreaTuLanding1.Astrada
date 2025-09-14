import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './component/Home/Home';
import NavBar from './component/NavBar/NavBar';
import ItemListContainer from './component/ItemListContainer/ItemListContainer';
import ItemDetailContainer from './component/ItemDetailConteiner/ItemDetailContainer';
import Cart from './component/Cart/Cart';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import Notification from './component/Notification/Notification';
import Checkout from './component/Checkout/Checkout';
import Login from './component/Login/Login';
import Register from './component/Register/Register';
import ProtectedRoute from './component/ProtectedRoute/ProtectedRoute';
import ProtectedAdminRoute from './component/ProtectedAdminRoute/ProtectedAdminRoute';
import OrderHistory from './component/OrderHistory/OrderHistory';
import PasswordReset from './component/PasswordReset/PasswordReset';
import AdminDashboard from './component/AdminDashboard/AdminDashboard';
import ProductManagement from './component/ProductManagement/ProductManagement';
import ProductForm from './component/ProductForm/ProductForm';
import OrderManagement from './component/OrderManagement/OrderManagement';
import Contacto from './component/Contacto/Contacto';
import Footer from './component/Footer/Footer';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <NavBar />
          <Notification />
          <div className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/productos" element={<ItemListContainer />} />
              <Route path="/category/:categoryId" element={<ItemListContainer />} />
              <Route path="/search/:searchTerm" element={<ItemListContainer />} />
              <Route path="/item/:id" element={<ItemDetailContainer />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/password-reset" element={<PasswordReset />} />
              <Route path="/contacto" element={<Contacto />} />
              <Route 
                path="/checkout" 
                element={
                  <ProtectedRoute>
                    <Checkout />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/mis-ordenes" 
                element={
                  <ProtectedRoute>
                    <OrderHistory />
                  </ProtectedRoute>
                } 
              />
              
              {/* Rutas de Administración */}
              <Route 
                path="/admin" 
                element={
                  <ProtectedAdminRoute>
                    <AdminDashboard />
                  </ProtectedAdminRoute>
                } 
              />
              
              <Route 
                path="/admin/products" 
                element={
                  <ProtectedAdminRoute>
                    <ProductManagement />
                  </ProtectedAdminRoute>
                } 
              />
              
              <Route 
                path="/admin/products/new" 
                element={
                  <ProtectedAdminRoute>
                    <ProductForm />
                  </ProtectedAdminRoute>
                } 
              />
              
              <Route 
                path="/admin/products/edit/:id" 
                element={
                  <ProtectedAdminRoute>
                    <ProductForm />
                  </ProtectedAdminRoute>
                } 
              />
              
              <Route 
                path="/admin/orders" 
                element={
                  <ProtectedAdminRoute>
                    <OrderManagement />
                  </ProtectedAdminRoute>
                } 
              />
              
              <Route path="*" element={<div>Página no encontrada</div>} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;