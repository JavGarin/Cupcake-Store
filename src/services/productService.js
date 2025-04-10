// src/services/productService.js
import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL + "/api/products";

export const getAllProducts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};
