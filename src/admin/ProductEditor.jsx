import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductEditor = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  // Obtener productos desde PostgreSQL
  const fetchProducts = async () => {
    const { data } = await axios.get('/api/products', {
      headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
    });
    setProducts(data);
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleSave = async (productData) => {
    if (editingProduct) {
      await axios.put(`/api/products/${editingProduct.id}`, productData);
    } else {
      await axios.post('/api/products', productData);
    }
    fetchProducts();
    setEditingProduct(null);
  };

  return (
    <div>
      <h2>Gestión de Cupcakes</h2>
      <button onClick={() => setEditingProduct({})}>+ Nuevo Cupcake</button>
      
      {editingProduct && (
        <ProductForm 
          product={editingProduct} 
          onSave={handleSave} 
          onCancel={() => setEditingProduct(null)}
        />
      )}

      <div className="product-grid">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <img src={product.image_url} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.price}</p>
            <button onClick={() => setEditingProduct(product)}>Editar</button>
            <button onClick={() => axios.delete(`/api/products/${product.id}`)}>Eliminar</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductEditor;