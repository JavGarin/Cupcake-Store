// src/views/Products.jsx
import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/products")
      .then((res) => res.json())
      .then((data) => {
        console.log("Productos recibidos:", data);
        setProducts(data);
      })
      .catch((error) => console.error("Error al cargar productos:", error));
  }, []);

  if (!products || products.length === 0) {
    return (
      <div className="container my-5 text-center">
        <h2>Catálogo</h2>
        <p className="text-muted mt-4">Cargando productos o no hay productos disponibles.</p>
      </div>
    );
  }

  return (
    <div className="container my-4">
      <h2 className="mb-4 text-center">Catálogo</h2>

      <div className="row">
        {products.map((prod) => (
          <div className="col-md-4 mb-4 d-flex" key={prod.cupcake_id}>
            <ProductCard product={prod} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
