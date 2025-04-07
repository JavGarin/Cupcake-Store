// src/views/Products.jsx
import React, { useEffect, useState } from "react";
import ProductDetail from "../components/ProductDetail";
import "./Products.css"; // Asegúrate de que este archivo exista

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/productos.json"); // temporal, luego conectas con backend
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <i className="fas fa-spinner fa-spin"></i>
      </div>
    );
  }

  return (
    <div className="products-container">
      <h1>Nuestros Cupcakes</h1>
      <div className="products-grid">
        {products.map((product) => (
          <ProductDetail key={product.cupcake_id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Products;
