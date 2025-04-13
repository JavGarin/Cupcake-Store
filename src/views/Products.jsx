import { useState, useEffect } from 'react';
import './Products.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3001/api/productos');
      
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      
      const data = await response.json();
      setProducts(data.data || data);
      setError(null);
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('No se pudieron cargar los productos. Verifica que el servidor esté corriendo.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) return <div className="loading">Cargando productos...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="products-container">
      <div className="products-header">
        <h1 className="products-title">Nuestros Cupcakes</h1>
      </div>
      
      <div className="products-grid">
        {products.map((product, index) => (
          <div 
            key={product.id} 
            className="product-card animated-card"
            style={{ '--i': index }}
          >
            <div className="product-image-container">
              <img 
                src={product.image} 
                alt={product.name}
                className="product-image"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/300x200?text=Cupcake+Image';
                  e.target.style.backgroundColor = '#f5f5f5';
                }}
              />
            </div>
            <div className="product-info">
              <h3 className="product-name">{product.name}</h3>
              <p className="product-price">${product.price}</p>
              <button className="add-to-cart-btn">Añadir al carrito</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;