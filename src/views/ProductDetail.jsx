// src/views/ProductDetail.jsx
import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { toast } from "react-toastify";

const ProductDetail = () => {
  const { cupcake_id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:3001/api/products/${cupcake_id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((error) => {
        console.error("Error al cargar el producto:", error);
        navigate("/"); // redirige si hay error
      });
  }, [cupcake_id, navigate]);

  if (!product) return <div className="container py-5">Cargando...</div>;

  const handleAdd = () => {
    addToCart({ ...product, quantity });
    toast.success(`${product.name} x${quantity} agregado al carrito 🧁`);
    setQuantity(1);
  };

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-md-6">
          <img
            src={product.image}
            alt={product.name}
            className="img-fluid rounded"
            style={{ maxHeight: "400px", objectFit: "cover" }}
          />
        </div>
        <div className="col-md-6">
          <h2>{product.name}</h2>
          <p className="text-muted">Precio: ${product.price.toLocaleString()}</p>
          <p>{product.description || "Sin descripción disponible."}</p>

          <div className="d-flex align-items-center my-3">
            <button className="btn btn-outline-secondary btn-sm" onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
            <span className="mx-3">{quantity}</span>
            <button className="btn btn-outline-secondary btn-sm" onClick={() => setQuantity(quantity + 1)}>+</button>
          </div>

          <div className="d-flex gap-2">
            <button className="btn btn-primary" onClick={handleAdd}>
              Agregar al carrito
            </button>
            <button className="btn btn-outline-secondary" onClick={() => navigate("/products")}>
              Volver al catálogo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
