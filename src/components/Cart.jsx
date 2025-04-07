// src/components/Cart.jsx
import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import "./Cart.css"; // Si tienes estilos específicos

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useContext(CartContext);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return <div className="empty-cart">Tu carrito está vacío.</div>;
  }

  return (
    <div className="cart-container">
      <h2>Tu Carrito</h2>
      {cart.map((item) => (
        <div key={item.id} className="cart-item">
          <img src={item.image} alt={item.name} />
          <div>
            <h4>{item.name}</h4>
            <p>Cantidad: {item.quantity}</p>
            <p>Precio unitario: ${item.price.toLocaleString()}</p>
            <p>Total: ${(item.price * item.quantity).toLocaleString()}</p>
            <button onClick={() => removeFromCart(item.id)}>Eliminar</button>
          </div>
        </div>
      ))}
      <h3>Total a pagar: ${total.toLocaleString()}</h3>
      <button onClick={clearCart}>Vaciar Carrito</button>
    </div>
  );
};

export default Cart;
