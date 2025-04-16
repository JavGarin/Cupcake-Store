import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import "./Products.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const API_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    fetch(`${API_URL}/api/products`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Productos recibidos:", data);
        setProducts(data);
      })
      .catch((error) => console.error("Error al cargar productos:", error));
  }, [API_URL]);

  if (!products || products.length === 0) {
    return (
      <div className="products-container loading-container">
        <h2>🧁 Catálogo 🧁</h2>
        <p className="text-muted">
          Cargando productos o no hay productos disponibles.
        </p>
      </div>
    );
  }

  return (
    <div className="products-container">
      <h2 className="catalog-title">⭐ Cupcakes ⭐</h2>
      <div className="products-grid">
        {products.map((prod) => (
          <ProductCard product={prod} key={prod.cupcake_id} />
        ))}
      </div>
    </div>
  );
};

export default Products;