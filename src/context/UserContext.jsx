import React, { createContext, useState, useEffect } from "react";
import axios from 'axios';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(() => localStorage.getItem("token") || "");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

  // Cargar datos del usuario al iniciar si hay token
  useEffect(() => {
    const loadUser = async () => {
      if (token) {
        setLoading(true);
        try {
          const response = await axios.get(`${API_URL}/auth/profile`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          setUser(response.data.user);
        } catch (err) {
          console.error("Error al cargar usuario:", err);
          logout();
        } finally {
          setLoading(false);
        }
      }
    };
    loadUser();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password
      });

      const { token: newToken, user: userData } = response.data;
      
      localStorage.setItem("token", newToken);
      setToken(newToken);
      setUser(userData);
      
    } catch (err) {
      const errorMsg = err.response?.data?.error || "Credenciales incorrectas";
      setError(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.post(`${API_URL}/auth/register`, {
        email,
        password
        // El username se genera en el backend
      });

      const { token: newToken, user: userData } = response.data;
      
      localStorage.setItem("token", newToken);
      setToken(newToken);
      setUser(userData);
      
    } catch (err) {
      const errorMsg = err.response?.data?.error || "Error al registrar";
      setError(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setToken("");
    setEmail("");
    setPassword("");
    setUser(null);
    localStorage.removeItem("token");
  };

  const isAdmin = () => user?.role === "admin";

  return (
    <UserContext.Provider
      value={{
        email,
        setEmail,
        password,
        setPassword,
        handleSubmit,
        handleRegister,
        token,
        user,
        loading,
        error,
        logout,
        isAdmin,
        isAuthenticated: !!token
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;