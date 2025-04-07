// src/components/ProductDetail.jsx
import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { CartContext } from "../context/CartContext";
import "./ProductDetail.css";

const ProductDetail = ({ product }) => {
  const { user } = useContext(UserContext);
  const { addToCart } = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);

  const incrementQuantity = () => {
    if (quantity < 10) setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleAddToCart = () => {
    if (!user) {
      alert("Debes iniciar sesión para agregar al carrito.");
      return;
    }

    addToCart({ ...product, quantity });
    alert("Producto añadido al carrito");
  };

  return (
    <div className="product-card" style={{ backgroundColor: product.bgColor || "#fff" }}>
      <img src={product.image} alt={product.name} className="product-image" />
      <div className="product-content">
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <div className="rating">
          {[...Array(5)].map((_, i) => (
            <i key={i} className={`fas fa-star ${i < Math.floor(product.rating) ? "filled" : ""}`} />
          ))}
          <span> ({product.rating})</span>
        </div>
        <p className="price">${product.price.toLocaleString()}</p>
        <div className="product-actions">
          <div className="quantity-selector">
            <button onClick={decrementQuantity}>-</button>
            <input
              type="number"
              min="1"
              max="10"
              value={quantity}
              onChange={(e) => {
                const val = parseInt(e.target.value);
                if (!isNaN(val) && val >= 1 && val <= 10) {
                  setQuantity(val);
                }
              }}
            />
            <button onClick={incrementQuantity}>+</button>
          </div>
          <button className="add-to-cart-btn" onClick={handleAddToCart}>
            Añadir - ${(product.price * quantity).toLocaleString()}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
