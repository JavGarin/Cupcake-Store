import React, { useContext } from "react";
import "./CartSidebar.css";
import { CartContext } from "../context/CartContext";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const CartSidebar = () => {
  const {
    cart,
    setCart,
    isCartSidebarOpen,
    toggleCartSidebar,
    clearCart
  } = useContext(CartContext);
  const { isLoggedIn } = useContext(UserContext);
  const navigate = useNavigate();

  if (!isLoggedIn) return null;

  const total = Array.isArray(cart)
    ? cart.reduce((acc, item) => acc + item.price * item.quantity, 0)
    : 0;

  const handleGoToCart = () => {
    toggleCartSidebar();
    navigate("/cart");
  };

  const increaseQuantity = (id) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.cupcake_id === id && item.quantity < item.stock
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.cupcake_id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
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
                <p>Precio: ${item.price.toLocaleString()}</p>
                <p>Stock disponible: {item.stock}</p>
                <div className="quantity-controls">
                  <button className="btn btn-sm btn-secondary" onClick={() => decreaseQuantity(item.cupcake_id)}>-</button>
                  <span className="mx-2">{item.quantity}</span>
                  <button
                    className="btn btn-sm btn-secondary"
                    onClick={() => increaseQuantity(item.cupcake_id)}
                    disabled={item.quantity >= item.stock}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="cart-sidebar-footer">
        <p>Total: ${total.toLocaleString()}</p>
        <button onClick={handleGoToCart} className="btn btn-primary w-100 mb-2">
          Ver carrito
        </button>
        <button onClick={clearCart} className="btn btn-danger w-100">
          Vaciar carrito
        </button>
      </div>
    </div>
  );
};

export default CartSidebar;
