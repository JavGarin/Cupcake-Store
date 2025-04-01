import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import "./Cart.css";

function Cart() {
  const { token } = useContext(UserContext);
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Choco classic",
      price: 2990,
      image: "/images/chococlassicA.png",
      quantity: 2
    },
    {
      id: 3,
      name: "Pie de Limón",
      price: 3500,
      image: "/images/limonA.png",
      quantity: 1
    }
  ]);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 20000 ? 0 : 3000;
  const total = subtotal + shipping;

  return (
    <div className="cart-container">
      <h1>Tu Carrito de Compras</h1>
      
      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <i className="fas fa-shopping-cart"></i>
          <h2>Tu carrito está vacío</h2>
          <p>¡Explora nuestros deliciosos cupcakes y añade algunos a tu carrito!</p>
          <Link to="/products" className="continue-shopping-btn">
            Continuar comprando
          </Link>
        </div>
      ) : (
        <div className="cart-grid">
          <div className="cart-items">
            {cartItems.map(item => (
              <div key={item.id} className="cart-item">
                <div className="item-image">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="item-details">
                  <h3>{item.name}</h3>
                  <p className="item-price">${item.price.toLocaleString()}</p>
                  <div className="item-quantity">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                      +
                    </button>
                  </div>
                </div>
                <div className="item-total">
                  <p>${(item.price * item.quantity).toLocaleString()}</p>
                  <button 
                    className="remove-item"
                    onClick={() => removeItem(item.id)}
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2>Resumen de compra</h2>
            <div className="summary-row">
              <span>Subtotal</span>
              <span>${subtotal.toLocaleString()}</span>
            </div>
            <div className="summary-row">
              <span>Envío</span>
              <span>{shipping === 0 ? 'Gratis' : `$${shipping.toLocaleString()}`}</span>
            </div>
            <div className="summary-total">
              <span>Total</span>
              <span>${total.toLocaleString()}</span>
            </div>
            
            {token ? (
              <Link to="/checkout" className="checkout-btn">
                Proceder al pago
              </Link>
            ) : (
              <div className="login-message">
                <p>Inicia sesión para continuar con la compra</p>
                <div className="auth-buttons">
                  <Link to="/login" className="auth-btn login-btn">
                    Iniciar sesión
                  </Link>
                  <Link to="/register" className="auth-btn register-btn">
                    Registrarse
                  </Link>
                </div>
              </div>
            )}
            
            <Link to="/products" className="continue-shopping-btn">
              Continuar comprando
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;