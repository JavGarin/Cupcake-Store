import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { toast } from "react-toastify";

const ProductDetail = () => {
  const { cupcake_id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        console.log("Intentando cargar producto con ID:", cupcake_id);
        const res = await fetch("http://localhost:3001/api/products");
        const data = await res.json();
        console.log("Lista completa recibida:", data);

        const found = data.find((p) => {
          console.log("Comparando:", p.cupcake_id, "==", Number(cupcake_id));
          return p.cupcake_id === Number(cupcake_id);
        });

        if (!found) {
          console.warn("Producto no encontrado con ID:", cupcake_id);
          throw new Error("Producto no encontrado");
        }

        console.log("Producto encontrado:", found);
        setProduct(found);
        setLoading(false);
      } catch (error) {
        console.error("Error de carga:", error.message);
        navigate("/products");
      }
    };

    fetchProduct();
  }, [cupcake_id, navigate]);

  if (loading) {
    return <div className="container py-5">Cargando producto...</div>;
  }

  const handleAddToCart = () => {
    if (quantity < 1) return;
    addToCart({ ...product, quantity });
    toast.success(`${product.name} x${quantity} agregado al carrito 🧁`);
    setQuantity(1);
  };

  return (
    <div className="container py-5">
      <div className="row align-items-center">
        <div className="col-md-6 mb-4">
          <img
            src={product.image}
            alt={product.name}
            className="img-fluid rounded shadow-sm"
            style={{ maxHeight: "400px", objectFit: "cover" }}
          />
        </div>
        <div className="col-md-6">
          <h2>{product.name}</h2>
          <p className="text-muted h5 mb-3">Precio: ${product.price.toLocaleString()}</p>
          <p>{product.description || "Este producto no tiene descripción."}</p>

          <div className="d-flex align-items-center gap-3 my-3">
            <button
              className="btn btn-outline-secondary btn-sm"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            >
              -
            </button>
            <span>{quantity}</span>
            <button
              className="btn btn-outline-secondary btn-sm"
              onClick={() => setQuantity((q) => q + 1)}
            >
              +
            </button>
          </div>

          <div className="d-flex gap-2 mt-3">
            <button className="btn btn-primary" onClick={handleAddToCart}>
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
