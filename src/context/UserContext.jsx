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

  const setAuthData = useCallback((newData) => {
    setAuthState(prev => ({ ...prev, ...newData }));
  }, []);

  const clearError = useCallback(() => {
    setAuthData({ error: null });
  }, [setAuthData]);

  useEffect(() => {
    const loadUser = async () => {
      if (authState.token && !authState.user) {
        try {
          setAuthData({ loading: true, error: null });
          const response = await axios.get(`${API_URL}/auth/profile`, {
            headers: {
              'Authorization': `Bearer ${authState.token}`
            }
          });

          if (response.data.success) {
            setAuthData({ user: response.data.user, loading: false });
          } else {
            throw new Error(response.data.error);
          }
        } catch (err) {
          setAuthData({
            error: "Sesión expirada. Inicia sesión nuevamente.",
            loading: false
          });
          logout();
        }
      }
    };
    loadUser();
  }, [authState.token, API_URL, authState.user, setAuthData]);

  const handleRegister = useCallback(async (formData) => {
    try {
      setAuthData({ loading: true, error: null });
      const response = await axios.post(`${API_URL}/auth/register`, formData);

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
        throw new Error(response.data.error);
      }
    } catch (err) {
      setAuthData({ error: err.message, loading: false });
      return { success: false, error: err.message };
    }
  }, [API_URL, navigate, setAuthData]);

  const handleLogin = useCallback(async (formData) => {
    try {
      setAuthData({ loading: true, error: null });
      const response = await axios.post(`${API_URL}/auth/login`, formData);

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
        throw new Error(response.data.error);
      }
    } catch (err) {
      setAuthData({ error: err.message, loading: false });
      return { success: false, error: err.message };
    }
  }, [API_URL, navigate, setAuthData]);

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
        clearError,
        isAuthenticated: !!authState.token
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
