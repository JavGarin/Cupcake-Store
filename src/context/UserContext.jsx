import React, { createContext, useState } from "react";

export const UserContext = createContext();
export const UserProvider = ({ children }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(() => {
    return localStorage.getItem("token") || "";
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
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
    if (data.token) {
      setToken(data.token);
      setEmail(data.email);
      localStorage.setItem("token", data.token);
      alert("Inicio de sesión exitoso");
    } else {
      alert(data?.error || "Inicio de sesión fallido, revisa la información ingresada e intenta nuevamente");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
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
      
      if (data.token) {
        setToken(data.token);
        setEmail(data.email);
        localStorage.setItem("token", data.token);
        alert("Registro exitoso!");
      } else {
        alert(data?.error || "Error en el registro");
      }
    } catch (error) {
      console.error("Error durante el registro:", error);
      alert("Error al intentar registrar el usuario");
    }
  };

  const getProfile = async () => {
    const response = await fetch("http://localhost:3001/api/auth/me", {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  };

  const logout = () => {
    setToken("");
    setEmail("");
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
        token,
        logout,
        handleRegister,
        getProfile,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
