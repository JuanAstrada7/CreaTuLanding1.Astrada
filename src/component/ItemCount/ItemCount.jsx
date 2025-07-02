import { useState } from 'react';
import './ItemCount.css';

const ItemCount = ({ stock, initial = 1, onAdd }) => {
  const [count, setCount] = useState(initial);

  const handleDecrease = () => {
    if (count > 1) setCount(count - 1);
  };

  const handleIncrease = () => {
    if (count < stock) setCount(count + 1);
  };

  const handleAdd = () => {
    onAdd(count);
  };

  return (
    <div className="item-count">
      <div>
        <button onClick={handleDecrease} disabled={count <= 1}>-</button>
        <span>{count}</span>
        <button onClick={handleIncrease} disabled={count >= stock}>+</button>
      </div>
      <button onClick={handleAdd} disabled={stock === 0}>
        Agregar al carrito
      </button>
      {stock === 0 && <p>Sin stock</p>}
    </div>
  );
};

export default ItemCount;