// src/components/ProductCard.jsx
import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  const handleAddToCart = () => {
    if (quantity > 0) {
      addToCart({ ...product, quantity });
      toast.success(`${product.name} x${quantity} agregado al carrito 🧁`);
      setQuantity(1); // Reinicia la cantidad
    }
  };

  const handleViewMore = () => {
    navigate(`/product/${product.cupcake_id}`);
  };

  const increase = () => setQuantity(quantity + 1);
  const decrease = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

  return (
    <div
      className="product-card"
      style={{
        border: "1px solid #eee",
        borderRadius: "12px",
        padding: "16px",
        backgroundColor: "#fff",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        justifyContent: "space-between"
      }}
    >
      <img
        src={product.image}
        alt={product.name}
        style={{
          width: "100%",
          height: "180px",
          objectFit: "cover",
          borderRadius: "8px",
          marginBottom: "12px"
        }}
      />
      <h5>{product.name}</h5>
      <p className="text-muted">${product.price.toLocaleString()}</p>

      {/* Controles de cantidad */}
      <div className="d-flex align-items-center justify-content-between my-2">
        <button onClick={decrease} className="btn btn-outline-secondary btn-sm">-</button>
        <span className="mx-2">{quantity}</span>
        <button onClick={increase} className="btn btn-outline-secondary btn-sm">+</button>
      </div>

      {/* Botones de acción */}
      <div className="d-flex gap-2 mt-3">
        <button onClick={handleAddToCart} className="btn btn-primary w-50">
          Comprar
        </button>
        <button onClick={handleViewMore} className="btn btn-outline-secondary w-50">
          Ver más
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
