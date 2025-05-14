import reactLogo from '../assets/react.svg';
import CartWidget from './CartWidget';

const NavBar = () => {
  return (
    <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#fff', padding: '1rem 2rem', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img src={reactLogo} alt="Logo" style={{ height: 48, marginRight: 16 }} />
        <span style={{ fontWeight: 'bold', fontSize: 24, color: '#d2691e' }}>Caprichos Pastelería</span>
      </div>
      <ul style={{ display: 'flex', listStyle: 'none', gap: 24, margin: 0, padding: 0 }}>
        <li><a href="#" style={{ color: '#d2691e', textDecoration: 'none', fontWeight: 500 }}>Tortas</a></li>
        <li><a href="#" style={{ color: '#d2691e', textDecoration: 'none', fontWeight: 500 }}>Cupcakes</a></li>
        <li><a href="#" style={{ color: '#d2691e', textDecoration: 'none', fontWeight: 500 }}>Cookies</a></li>
        <li><a href="#" style={{ color: '#d2691e', textDecoration: 'none', fontWeight: 500 }}>Especiales</a></li>
      </ul>
      <CartWidget />
    </nav>
  );
};

export default NavBar; 