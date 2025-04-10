// src/components/Cart.jsx
import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, removeFromCart } = useContext(CartContext);

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleRemoveFromCart = (id) => {
    removeFromCart(id);
    toast.info("Producto eliminado del carrito");
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4">Carrito de Compras</h2>
      {cart.length === 0 ? (
        <p>No tienes productos en tu carrito.</p>
      ) : (
        <div className="cart-items">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Precio</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.cupcake_id}>
                  <td>
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{ width: "50px", height: "50px" }}
                    />{" "}
                    {item.name}
                  </td>
                  <td>{item.quantity}</td>
                  <td>${(item.price * item.quantity).toLocaleString()}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleRemoveFromCart(item.cupcake_id)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="d-flex justify-content-between">
            <h4>Total: ${totalPrice.toLocaleString()}</h4>
            <Link to="/checkout" className="btn btn-success">
              Finalizar Compra
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
