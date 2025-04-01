import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Products.css";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/productos.json");
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = filter === "all" 
    ? products 
    : products.filter(product => 
        filter === "featured" ? product.rating >= 4.5 : true
      );

  return (
    <div className="products-container">
      <div className="products-header">
        <h1>Nuestros Cupcakes</h1>
        <div className="filter-buttons">
          <button 
            className={filter === "all" ? "active" : ""}
            onClick={() => setFilter("all")}
          >
            Todos
          </button>
          <button 
            className={filter === "featured" ? "active" : ""}
            onClick={() => setFilter("featured")}
          >
            Destacados
          </button>
        </div>
      </div>

      {loading ? (
        <div className="loading-spinner">
          <i className="fas fa-spinner fa-spin"></i>
        </div>
      ) : (
        <div className="products-grid">
          {filteredProducts.map((product) => (
            <div key={product.cupcake_id} className="product-card">
              <Link to={`/product/${product.cupcake_id}`}>
                <div className="product-image-container">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="product-image"
                  />
                  {product.rating >= 4.5 && (
                    <span className="featured-badge">Destacado</span>
                  )}
                </div>
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <div className="product-rating">
                    {[...Array(5)].map((_, i) => (
                      <i 
                        key={i}
                        className={`fas fa-star ${i < Math.floor(product.rating) ? "filled" : ""} ${
                          i === Math.floor(product.rating) && product.rating % 1 >= 0.5 ? "half-filled" : ""
                        }`}
                      ></i>
                    ))}
                    <span>({product.rating})</span>
                  </div>
                  <p className="product-price">${product.price.toLocaleString()}</p>
                  <button className="add-to-cart-btn">
                    Añadir al carrito
                  </button>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Products;