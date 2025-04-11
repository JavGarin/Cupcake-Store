// src/components/CartSidebar.jsx
import React, { useContext } from "react";
import "./CartSidebar.css";
import { CartContext } from "../context/CartContext";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const CartSidebar = () => {
  const { cart, isCartSidebarOpen, toggleCartSidebar } = useContext(CartContext);
  const { isLoggedIn } = useContext(UserContext);
  const navigate = useNavigate();

  if (!isLoggedIn) return null;

  // const total = cart.reduce(
  //   (sum, item) => sum + item.price * (item.quantity || 1),
  //   0
  // );
 const total = Array.isArray(cart) ? cart.reduce((acc, item) => acc + item.price * item.quantity, 0) : 0;


  const handleGoToCart = () => {
    toggleCartSidebar();
    navigate("/cart");
  };

  return (
    <div className={`cart-sidebar ${isCartSidebarOpen ? "open" : ""}`}>
      <div className="cart-sidebar-header">
        <h3>Resumen del carrito</h3>
        <button onClick={toggleCartSidebar} className="close-btn">&times;</button>
      </div>

      <div className="cart-sidebar-body">
        {cart.length === 0 ? (
          <p>Tu carrito está vacío.</p>
        ) : (
          Array.isArray(cart) && cart.map((item) => (
            <div key={item.cupcake_id} className="cart-item">
              <img src={item.image} alt={item.name} />
              <div className="item-info">
                <h5>{item.name}</h5>
                <p>
                  {item.quantity} x ${item.price.toLocaleString()}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="cart-sidebar-footer">
        <p>Total: ${total.toLocaleString()}</p>
        <button onClick={handleGoToCart} className="btn btn-primary w-100">
          Ver carrito
        </button>
      </div>
    </div>
  );
};

export default CartSidebar;
