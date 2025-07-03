import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchBar.css';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const categories = ['todos', 'tortas', 'cupcakes', 'tartas'];

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search/${searchTerm}`);
  };

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    navigate(category === 'todos' ? '/productos' : `/category/${category}`);
  };

  return (
    <div className="search-bar">
      <form onSubmit={handleSearch}>
        <input
          id="search-input"
          name="search"
          type="text"
          placeholder="Buscar productos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">Buscar</button>
      </form>

      <select
        id="category-select"
        name="category"
        onChange={handleCategoryChange}
      >
        <option value="todos">Todos los productos</option>
        <option value="tortas">Tortas</option>
        <option value="cupcakes">Cupcakes</option>
        <option value="tartas">Tartas</option>
      </select>
    </div>
  );
};

export default SearchBar;