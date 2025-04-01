import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./ProductDetail.css";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch("/productos.json");
        const data = await response.json();
        const foundProduct = data.find(p => p.cupcake_id === parseInt(id));
        setProduct(foundProduct);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0 && value <= 10) {
      setQuantity(value);
    }
  };

  const incrementQuantity = () => {
    if (quantity < 10) setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <i className="fas fa-spinner fa-spin"></i>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="not-found-container">
        <h2>Producto no encontrado</h2>
        <p>Lo sentimos, el cupcake que buscas no está disponible.</p>
      </div>
    );
  }

  // Simulamos imágenes adicionales para el producto
  const productImages = [
    product.image,
    product.image.replace('A.png', 'B.png'),
    product.image.replace('A.png', 'C.png'),
  ].filter(img => img !== product.image);

  return (
    <div className="product-detail-container">
      <div className="product-detail-grid">
        {/* Galería de imágenes */}
        <div className="product-gallery">
          <div className="main-image">
            <img 
              src={productImages[selectedImage] || product.image} 
              alt={product.name} 
            />
          </div>
          <div className="thumbnail-container">
            {productImages.map((img, index) => (
              <div 
                key={index}
                className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                onClick={() => setSelectedImage(index)}
              >
                <img src={img} alt={`${product.name} ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>

        {/* Información del producto */}
        <div className="product-info">
          <h1>{product.name}</h1>
          <div className="product-meta">
            <div className="rating">
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
            <div className="sku">SKU: CC-{product.cupcake_id.toString().padStart(3, '0')}</div>
          </div>

          <div className="product-price">
            ${product.price.toLocaleString()}
          </div>

          <div className="product-description">
            <p>{product.description}</p>
          </div>

          <div className="product-actions">
            <div className="quantity-selector">
              <button onClick={decrementQuantity}>-</button>
              <input 
                type="number" 
                min="1" 
                max="10" 
                value={quantity}
                onChange={handleQuantityChange}
              />
              <button onClick={incrementQuantity}>+</button>
            </div>

            <button className="add-to-cart-btn">
              Añadir al carrito - ${(product.price * quantity).toLocaleString()}
            </button>
          </div>

          <div className="product-details">
            <h3>Detalles del producto</h3>
            <ul>
              <li><strong>Ingredientes:</strong> Bizcocho de vainilla, crema de mantequilla, decoración personalizada</li>
              <li><strong>Tamaño:</strong> Standard (aproximadamente 8cm de altura)</li>
              <li><strong>Alérgenos:</strong> Contiene gluten, huevo, leche</li>
              <li><strong>Conservación:</strong> Mantener refrigerado, consumir en 3 días</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Productos relacionados */}
      <div className="related-products">
        <h2>También te puede gustar</h2>
        <div className="related-grid">
          {/* Aquí irían productos relacionados */}
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;