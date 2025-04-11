// src/context/CartContext.js
import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isCartSidebarOpen, setIsCartSidebarOpen] = useState(false); // 🟢 nombre consistente

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

  // 🟢 funciones con nombres coherentes
  const toggleCartSidebar = () => setIsCartSidebarOpen(prev => !prev);
  const openCartSidebar = () => setIsCartSidebarOpen(true);
  const closeCartSidebar = () => setIsCartSidebarOpen(false);

// Contexto para sincronización con backend
const fetchCartFromBackend = async () => {
  try {
    const res = await axios.get('/api/cart', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    setCart(res.data);
  } catch (error) {
    console.error("Error al obtener carrito desde el backend:", error);
  }
};

const addToCartBackend = async (product) => {
  try {
    await axios.post('/api/cart', {
      cupcake_id: product.cupcake_id,
      quantity: product.quantity,
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    fetchCartFromBackend(); // opcionalmente sincroniza
  } catch (error) {
    console.error("Error al agregar producto al backend:", error);
  }
};

const removeFromCartBackend = async (cupcake_id) => {
  try {
    await axios.delete(`/api/cart/${cupcake_id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    fetchCartFromBackend(); // opcional
  } catch (error) {
    console.error("Error al eliminar producto del backend:", error);
  }
};

// 🔁 Fetch inicial al montar
useEffect(() => {
  fetchCartFromBackend();
}, []);

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      clearCart,
      isCartSidebarOpen,
      toggleCartSidebar,
      openCartSidebar,
      closeCartSidebar,
      addToCartBackend,
      removeFromCartBackend,
      fetchCartFromBackend
    }}>
      {children}
    </CartContext.Provider>
  );
};
