import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [notification, setNotification] = useState(null);

  const addToCart = (product) => {
    setCart(prevCart => {
      const existing = prevCart.find(item => item.id === product.id);
      if (existing) {
        // Verificar que no exceda el stock disponible
        const newQuantity = existing.quantity + product.quantity;
        if (newQuantity > product.stock) {
          setNotification(`No hay suficiente stock. Máximo disponible: ${product.stock}`);
          setTimeout(() => setNotification(null), 3000);
          return prevCart;
        }
        
        setNotification('¡Cantidad actualizada en el carrito!');
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: newQuantity }
            : item
        );
      } else {
        setNotification('¡Producto agregado al carrito!');
        return [...prevCart, product];
      }
    });
    setTimeout(() => setNotification(null), 2000);
  };

  const removeFromCart = (id) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const getTotalItems = () => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  };

  const increaseQuantity = (id) => {
    setCart(prevCart =>
      prevCart.map(item => {
        if (item.id === id) {
          // Verificar que no exceda el stock disponible
          if (item.quantity < item.stock) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            setNotification(`No hay más stock disponible para ${item.name}`);
            setTimeout(() => setNotification(null), 3000);
          }
        }
        return item;
      })
    );
  };

  const decreaseQuantity = (id) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      clearCart,
      getTotalItems,
      increaseQuantity,
      decreaseQuantity,
      notification,
    }}>
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe ser usado dentro de un CartProvider');
  }
  return context;
};

export { CartContext, CartProvider, useCart };