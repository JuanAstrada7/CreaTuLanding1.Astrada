import ProductCard from '../ProductCard/ProductCard';

const ItemList = ({ products, onAddToCart }) => {
  if (products.length === 0) {
    return <p className="no-products">No hay productos disponibles en esta categoría</p>;
  }

  return (
    <div className="products-grid">
      {products.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
};

export default ItemList;