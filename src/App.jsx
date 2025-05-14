import NavBar from './component/NavBar/NavBar';
import ItemListContainer from './component/ItemListContainer/ItemListContainer';
import './App.css';

function App() {
  return (
    <>
      <NavBar />
      <ItemListContainer greetings="¡Bienvenido a Caprichos Pastelería! Descubre nuestros productos dulces y especiales." />
    </>
  );
}

export default App;
