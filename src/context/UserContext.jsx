import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(() => {
    return localStorage.getItem("token") || "";
  });
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Verificar token al cargar
  useEffect(() => {
    if (token) {
      getProfile();
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch("http://localhost:3001/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || "Error en el inicio de sesión");
      }
      
      if (data.token) {
        setToken(data.token);
        localStorage.setItem("token", data.token);
        setEmail(data.email || "");
        await getProfile();
      }
    } catch (err) {
      setError(err.message || "Inicio de sesión fallido");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      if (password.length < 6) {
        throw new Error("La contraseña debe tener al menos 6 caracteres");
      }
      
      const response = await fetch("http://localhost:3001/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || "Error en el registro");
      }
      
      if (data.token) {
        setToken(data.token);
        localStorage.setItem("token", data.token);
        setEmail(data.email || "");
        await getProfile();
      }
    } catch (err) {
      setError(err.message || "Error al registrar el usuario");
    } finally {
      setLoading(false);
    }
  };

  const getProfile = async () => {
    if (!token) return;
    
    try {
      const response = await fetch("http://localhost:3001/api/auth/me", {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      if (!response.ok) {
        throw new Error("Error al obtener perfil");
      }
      
      const data = await response.json();
      setUser(data);
    } catch (err) {
      console.error("Error al obtener perfil:", err);
      logout();
    }
  };

  const logout = () => {
    setToken("");
    setEmail("");
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('cart');
  };

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
        getProfile,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;