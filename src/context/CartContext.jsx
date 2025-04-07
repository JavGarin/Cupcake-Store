// src/context/CartContext.js
import { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (productToAdd) => {
    setCart((prevCart) => {
      const existing = prevCart.find(item => item.cupcake_id === productToAdd.cupcake_id);
      if (existing) {
        return prevCart.map(item =>
          item.cupcake_id === productToAdd.cupcake_id
            ? { ...item, quantity: item.quantity + productToAdd.quantity }
            : item
        );
      }
      return [...prevCart, { ...productToAdd }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter(item => item.cupcake_id !== productId));
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
