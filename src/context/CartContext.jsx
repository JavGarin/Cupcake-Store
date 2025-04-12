import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isCartSidebarOpen, setIsCartSidebarOpen] = useState(false);

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

  const toggleCartSidebar = () => setIsCartSidebarOpen(prev => !prev);
  const openCartSidebar = () => setIsCartSidebarOpen(true);
  const closeCartSidebar = () => setIsCartSidebarOpen(false);

  const fetchCartFromBackend = async () => {
    try {
      const res = await axios.get('http://localhost:3001/api/cart', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      console.log("🛒 Carrito desde backend:", res.data);
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
      fetchCartFromBackend();
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
      fetchCartFromBackend();
    } catch (error) {
      console.error("Error al eliminar producto del backend:", error);
    }
  };

  useEffect(() => {
    fetchCartFromBackend();
  }, []);

  return (
    <CartContext.Provider value={{
      cart,
      setCart,
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
