import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
import OrderHistory from './component/OrderHistory/OrderHistory';
import PasswordReset from './component/PasswordReset/PasswordReset';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <NavBar />
          <Notification />
          <Routes>
            <Route path="/" element={<ItemListContainer greetings="¡Bienvenido a Caprichos Pastelería!" />} />
            <Route path="/productos" element={<ItemListContainer />} />
            <Route path="/category/:categoryId" element={<ItemListContainer />} />
            <Route path="/search/:searchTerm" element={<ItemListContainer />} />
            <Route path="/item/:id" element={<ItemDetailContainer />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/password-reset" element={<PasswordReset />} />
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
            <Route path="/contacto" element={<div>Página de Contacto</div>} />
            <Route path="*" element={<div>Página no encontrada</div>} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;