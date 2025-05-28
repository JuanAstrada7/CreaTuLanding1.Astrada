import NavBar from './component/NavBar/NavBar';
import ItemListContainer from './component/ItemListContainer/ItemListContainer';
import { CartProvider } from './context/CartContext';
import './App.css';

function App() {
  return (
    <CartProvider>
      <NavBar />
      <ItemListContainer greetings="¡Bienvenido a Caprichos Pastelería! Descubre nuestros productos dulces y especiales." />
    </CartProvider>
  );
}

export default App;
