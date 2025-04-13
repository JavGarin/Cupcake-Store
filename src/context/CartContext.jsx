import { createContext, useState, useEffect, useContext } from 'react';
import { UserContext } from './UserContext';
import axios from 'axios';

// URL base de la API
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useContext(UserContext);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Función para manejar errores de API
  const handleApiError = (error) => {
    console.error('Error en la petición:', error);
    setError(error.response?.data?.message || 'Error al procesar la solicitud');
    return false;
  };

  // Obtener el carrito del usuario
  const fetchCart = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/cart`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setCartItems(response.data.data || []);
      setError(null);
    } catch (error) {
      handleApiError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [user]);

  // Agregar producto al carrito
  const addToCart = async (product, quantityToAdd = 1) => {
    if (!user) return false;

    try {
      const response = await axios.post(
        `${API_URL}/cart`,
        { product_id: product.cupcake_id, quantity: quantityToAdd },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      
      setCartItems(response.data.data || []);
      return true;
    } catch (error) {
      return handleApiError(error);
    }
  };

  // Eliminar producto del carrito
  const removeFromCart = async (cupcakeId) => {
    if (!user) return false;

    try {
      const response = await axios.delete(`${API_URL}/cart/${cupcakeId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setCartItems(response.data.data || []);
      return true;
    } catch (error) {
      return handleApiError(error);
    }
  };

  // Actualizar cantidad en el carrito
  const updateCartQuantity = async (cupcakeId, newQuantity) => {
    if (!user) return false;

    try {
      const quantity = Math.max(1, newQuantity);
      const response = await axios.put(
        `${API_URL}/cart/${cupcakeId}`,
        { quantity },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setCartItems(response.data.data || []);
      return true;
    } catch (error) {
      return handleApiError(error);
    }
  };

  // Limpiar el carrito
  const clearCart = async () => {
    if (!user) return false;

    try {
      // Implementación alternativa si tu backend no tiene un endpoint para limpiar
      // Elimina cada item uno por uno
      await Promise.all(
        cartItems.map(item => 
          axios.delete(`${API_URL}/cart/${item.product_id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          })
        )
      );
      setCartItems([]);
      return true;
    } catch (error) {
      return handleApiError(error);
    }
  };

  // Calcular total del carrito
  const cartTotal = cartItems.reduce(
    (total, item) => total + (item.price * item.quantity),
    0
  );

  // Calcular cantidad total de items
  const itemCount = cartItems.reduce(
    (count, item) => count + item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        loading,
        error,
        cartTotal,
        itemCount,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        refreshCart: fetchCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);