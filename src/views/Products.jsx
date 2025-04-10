// components/Products.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Products.css";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/productos');
        const data = await response.json();
        if (data.success) {
          setProducts(data.data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  if (loading) return <div className="loading">Cargando cupcakes...</div>;

  return (
    <div className="products-container">
      <h1 className="products-title">Nuestros Cupcakes</h1>
      <div className="products-grid">
        {products.map((product, index) => (
          <div 
            key={product.id} 
            className="product-card animated-card"
            style={{ "--i": index }}
            onClick={() => handleProductClick(product.id)}
          >
            <div className="product-image-container">
              <img 
                src={product.image} 
                alt={product.name}
                className="product-image"
                onError={(e) => e.target.src = '/placeholder-cupcake.png'}
              />
            </div>
            <div className="product-info">
              <h3>{product.name}</h3>
              <p className="product-price">${product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
