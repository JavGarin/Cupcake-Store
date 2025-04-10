import React, { createContext, useState, useEffect, useCallback } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    email: "",
    password: "",
    token: localStorage.getItem("token") || "",
    user: null,
    loading: false,
    error: null
  });

  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

  // Función para actualizar el estado
  const setAuthData = useCallback((newData) => {
    setAuthState(prev => ({ ...prev, ...newData }));
  }, []);

  // Función específica para limpiar errores
  const clearError = useCallback(() => {
    setAuthData({ error: null });
  }, [setAuthData]);

  // Cargar datos del usuario al iniciar
  useEffect(() => {
    const loadUser = async () => {
      if (authState.token && !authState.user) {
        try {
          setAuthData({ loading: true, error: null });
          const response = await axios.get(`${API_URL}/auth/profile`, {
            headers: { 
              'Authorization': `Bearer ${authState.token}`,
              'Content-Type': 'application/json'
            }
          });
          
          if (response.data.success) {
            setAuthData({ 
              user: response.data.user, 
              loading: false 
            });
          } else {
            throw new Error(response.data.error || "Error al cargar usuario");
          }
        } catch (err) {
          console.error("Error al cargar usuario:", err);
          setAuthData({ 
            error: "La sesión ha expirado. Por favor inicia sesión nuevamente.",
            loading: false 
          });
          logout();
        }
      }
    };
    loadUser();
  }, [authState.token, API_URL, authState.user, setAuthData]);

  // Función de registro
  const handleRegister = useCallback(async (formData) => {
    try {
      setAuthData({ loading: true, error: null });
      const response = await axios.post(`${API_URL}/auth/register`, formData, {
        headers: { 'Content-Type': 'application/json' }
      });

      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        setAuthData({
          token: response.data.token,
          user: response.data.user,
          loading: false,
          email: formData.email,
          password: ""
        });
        
        navigate('/', { 
          state: { message: '¡Registro exitoso! Bienvenido.' },
          replace: true 
        });
        return { success: true };
      } else {
        throw new Error(response.data.error || "Error en el registro");
      }
    } catch (err) {
      const errorMsg = err.response?.data?.error || err.message || "Error al registrar. Intenta nuevamente.";
      setAuthData({ error: errorMsg, loading: false });
      return { 
        success: false, 
        error: errorMsg 
      };
    }
  }, [API_URL, navigate, setAuthData]);

  // Función de login
  const handleLogin = useCallback(async (formData) => {
    try {
      setAuthData({ loading: true, error: null });
      const response = await axios.post(`${API_URL}/auth/login`, formData, {
        headers: { 'Content-Type': 'application/json' }
      });

      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        setAuthData({
          token: response.data.token,
          user: response.data.user,
          loading: false,
          email: formData.email,
          password: ""
        });
        
        navigate('/', { replace: true });
        return { success: true };
      } else {
        throw new Error(response.data.error || "Error en el login");
      }
    } catch (err) {
      const errorMsg = err.response?.data?.error || err.message || "Credenciales inválidas. Verifica tus datos.";
      setAuthData({ error: errorMsg, loading: false });
      return { 
        success: false, 
        error: errorMsg 
      };
    }
  }, [API_URL, navigate, setAuthData]);

  // Función de logout
  const logout = useCallback(() => {
    localStorage.removeItem("token");
    setAuthData({
      token: "",
      user: null,
      email: "",
      password: "",
      error: null
    });
    navigate('/login', { replace: true });
  }, [navigate, setAuthData]);

  // Verificar roles
  const isAdmin = useCallback(() => authState.user?.role === "admin", [authState.user]);
  const isCustomer = useCallback(() => authState.user?.role === "customer", [authState.user]);

  return (
    <UserContext.Provider
      value={{
        ...authState,
        setAuthData,
        handleLogin,
        handleRegister,
        logout,
        isAdmin,
        isCustomer,
        clearError, // Añadimos esta función
        isAuthenticated: !!authState.token,
        setEmail: (email) => setAuthData({ email }),
        setPassword: (password) => setAuthData({ password })
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;