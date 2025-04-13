import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ProductDetail.css";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const { addToCart: addToCartContext } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/productos/${id}`);
        const data = await response.json();
        if (data.success) {
          setProduct(data.data);
        } else {
          toast.error("Producto no encontrado");
          navigate("/products");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        toast.error("Error al cargar el producto");
        navigate("/products");
      }
    };

    fetchProduct();
  }, [id, navigate]);

  const handleAddToCart = async () => {
    if (!product || isAddingToCart) return;
    
    setIsAddingToCart(true);
    
    try {
      const success = await addToCartContext(product, quantity);
      
      if (success) {
        toast.success(`🧁 ¡${quantity} ${product.name} agregado${quantity > 1 ? 's' : ''} al carrito!`, {
          position: "bottom-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          className: "toast-gold",
        });

        // Redirige al carrito después de un pequeño delay
        setTimeout(() => {
          navigate("/cart");
        }, 1500);
      } else {
        toast.error("Debes iniciar sesión para agregar al carrito", {
          position: "bottom-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Error al agregar al carrito", {
        position: "bottom-right",
        autoClose: 3000,
      });
    } finally {
      setIsAddingToCart(false);
    }
  };

  const goBackToProducts = () => {
    navigate("/products");
  };

  if (!product) return <div className="loading">Cargando producto...</div>;

  return (
    <div className="product-detail-container">
      <div className="product-detail">
        <div className="product-image-container">
          <img
            src={product.image}
            alt={product.name}
            className="product-image"
            onError={(e) => (e.target.src = "/placeholder-cupcake.png")}
          />
        </div>

        <div className="product-info">
          <h1 className="product-title">{product.name}</h1>
          <p className="product-price">${product.price.toLocaleString()}</p>

          <div className="product-description">
            <h3>Descripción:</h3>
            <p>{product.description}</p>
          </div>

          <div className="quantity-controls">
            <label htmlFor="quantity">Cantidad:</label>
            <div className="quantity-selector">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
              >
                -
              </button>
              <span className="quantity-value">{quantity}</span>
              <button 
                onClick={() => setQuantity(quantity + 1)}
                disabled={quantity >= 10} // Límite máximo de 10
              >
                +
              </button>
            </div>
            {quantity >= 10 && (
              <p className="quantity-warning">Máximo 10 unidades por producto</p>
            )}
          </div>

          <button 
            onClick={handleAddToCart} 
            className="add-to-cart-button"
            disabled={isAddingToCart}
          >
            {isAddingToCart ? "Agregando..." : "Agregar al Carrito"}
          </button>
        </div>
      </div>

      <button
        onClick={goBackToProducts}
        className="back-to-products-button"
      >
        ← Sigue viendo productos 🧁
      </button>

      {/* Contenedor de notificaciones */}
      <ToastContainer />
    </div>
  );
}

export default ProductDetail;