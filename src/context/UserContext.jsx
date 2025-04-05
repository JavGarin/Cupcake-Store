import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(() => localStorage.getItem("token") || "");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [mockUsers, setMockUsers] = useState([
    {
      id: 1,
      email: "admin1@cupcake.com",
      password: "admin123",
      name: "Administrador",
      role: "admin"
    }
  ]);

  useEffect(() => {
    const loadUser = async () => {
      if (token) {
        setLoading(true);
        try {
          await new Promise(resolve => setTimeout(resolve, 300));
          const storedEmail = localStorage.getItem("userEmail");
          const userData = mockUsers.find(u => u.email === storedEmail) || null;
          setUser(userData);
        } finally {
          setLoading(false);
        }
      }
    };
    loadUser();
  }, [token]);

  const generateToken = () => `demo-token-${Math.random().toString(36).substr(2)}-${Date.now()}`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      if (!email.trim() || !password.trim()) {
        throw new Error("Email y contraseña son requeridos");
      }

      await new Promise(resolve => setTimeout(resolve, 800));
      
      const userFound = mockUsers.find(u => 
        u.email === email && u.password === password
      );
      
      if (!userFound) throw new Error("Credenciales incorrectas");
      
      const newToken = generateToken();
      localStorage.setItem("token", newToken);
      localStorage.setItem("userEmail", userFound.email);
      setToken(newToken);
      setUser(userFound);
      
    } catch (err) {
      setError(err.message);
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

      await new Promise(resolve => setTimeout(resolve, 800));
      
      if (mockUsers.some(u => u.email === email)) {
        throw new Error("El email ya está registrado");
      }
      
      const newUser = {
        id: Math.max(...mockUsers.map(u => u.id), 0) + 1,
        email,
        password,
        name: email.split('@')[0],
        role: "customer"
      };
      
      const newToken = generateToken();
      setMockUsers(prev => [...prev, newUser]);
      localStorage.setItem("token", newToken);
      localStorage.setItem("userEmail", newUser.email);
      setToken(newToken);
      setUser(newUser);
      
    } catch (err) {
      setError(err.message);
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
        isAuthenticated: !!user
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;