import NavBar from './components/NavBar';
import ItemListContainer from './components/ItemListContainer';
import './App.css';

function App() {
  return (
    <>
      <NavBar />
      <ItemListContainer greeting="¡Bienvenido a Caprichos Pastelería! Descubre nuestros productos dulces y especiales." />
    </>
  );
}

export default App;
