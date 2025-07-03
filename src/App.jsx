import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './component/NavBar/NavBar';
import ItemListContainer from './component/ItemListContainer/ItemListContainer';
import ItemDetailContainer from './component/ItemDetailConteiner/ItemDetailContainer';
import Cart from './component/Cart/Cart';
import { CartProvider } from './context/CartContext';
import Notification from './component/Notification/Notification';
import './App.css';

function App() {
  return (
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
          <Route path="/contacto" element={<div>Página de Contacto</div>} />
          <Route path="*" element={<div>Página no encontrada</div>} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;