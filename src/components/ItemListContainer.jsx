const ItemListContainer = ({ greeting }) => {
  return (
    <section style={{ margin: '2rem auto', padding: '2rem', background: '#fff8f0', borderRadius: 12, maxWidth: 600, textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
      <h2 style={{ color: '#d2691e' }}>{greeting}</h2>
    </section>
  );
};

export default ItemListContainer; 