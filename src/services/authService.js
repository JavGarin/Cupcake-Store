import axios from 'axios';

const API_URL = import.meta.env.VITE_BACKEND_URL + '/api/auth';

// Registro de usuario
export const register = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
};

// Login de usuario
export const login = async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData);
  return response.data;
};

// Obtener perfil del usuario autenticado
export const getProfile = async () => {
  const token = localStorage.getItem("token"); // ✅ Obtiene token automáticamente

  const response = await axios.get(`${API_URL}/profile`, {
    headers: {
      Authorization: `Bearer ${token}`, // ✅ Incluye token en la cabecera
    },
  });

  return response.data;
};
