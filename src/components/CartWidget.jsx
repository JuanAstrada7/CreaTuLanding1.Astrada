const CartWidget = () => {
  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <span style={{ fontSize: 28, color: '#d2691e' }}>🛒</span>
      <span style={{ position: 'absolute', top: -8, right: -8, background: '#ff6347', color: '#fff', borderRadius: '50%', padding: '2px 8px', fontSize: 12, fontWeight: 'bold' }}>3</span>
    </div>
  );
};

export default CartWidget; 