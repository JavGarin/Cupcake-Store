import React, { createContext, useState, useEffect } from "react";
import { register as registerUser, login as loginUser, getProfile } from "../services/authService";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(() => localStorage.getItem("token") || "");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      if (token) {
        setLoading(true);
        try {
          const profile = await getProfile(token);
          setUser(profile);
        } catch (err) {
          console.error("Error al cargar perfil:", err);
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
      if (!email.trim() || !password.trim()) {
        throw new Error("Email y contraseña son requeridos");
      }

      const response = await loginUser({ email, password });
      const newToken = response.token;

      localStorage.setItem("token", newToken);
      setToken(newToken);

      const profile = await getProfile(newToken);
      setUser(profile);
      localStorage.setItem("userEmail", profile.email);

    } catch (err) {
      setError(err.response?.data?.error || err.message || "Error al iniciar sesión");
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
      if (!email.trim() || !password.trim()) {
        throw new Error("Email y contraseña son requeridos");
      }

      if (password.length < 6) {
        throw new Error("La contraseña debe tener al menos 6 caracteres");
      }

      await registerUser({
        email,
        password,
        username: email.split("@")[0]
      });

      window.location.href = "/login";

    } catch (err) {
      setError(err.response?.data?.error || err.message || "Error al registrar");
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
    localStorage.removeItem("userEmail");
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
        isAuthenticated: !!user,
        isLoggedIn: !!user // ✅ Agregado para compatibilidad con ProductDetail
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
