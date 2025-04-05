import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const ProductEditor = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image_url: ''
  });

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get('/api/admin/products', {
        headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
      });
      setProducts(data);
    } catch (error) {
      toast.error('Error al cargar productos');
    }
  };

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingProduct) {
        await axios.put(
          `/api/admin/products/${editingProduct.id}`,
          formData
        );
        toast.success('Producto actualizado');
      } else {
        await axios.post('/api/admin/products', formData);
        toast.success('Producto creado');
      }
      setEditingProduct(null);
      fetchProducts();
    } catch (error) {
      toast.error('Error al guardar');
    }
  };

  useEffect(() => {
    fetchProducts();
    if (editingProduct) {
      setFormData({
        name: editingProduct.name,
        description: editingProduct.description,
        price: editingProduct.price,
        image_url: editingProduct.image_url
      });
    }
  }, [editingProduct]);

  return (
    <div>
      <h2>Gestión de Cupcakes</h2>
      
      <form onSubmit={handleSubmit}>
        <input name="name" value={formData.name} onChange={handleChange} placeholder="Nombre" required />
        <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Descripción" />
        <input name="price" type="number" value={formData.price} onChange={handleChange} placeholder="Precio" required />
        <input name="image_url" value={formData.image_url} onChange={handleChange} placeholder="URL de imagen" />
        
        <button type="submit">Guardar</button>
        {editingProduct && <button type="button" onClick={() => setEditingProduct(null)}>Cancelar</button>}
      </form>

      <div className="product-list">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <img src={product.image_url} alt={product.name} />
            <h3>{product.name}</h3>
            <p>${product.price}</p>
            <button onClick={() => setEditingProduct(product)}>Editar</button>
            <button onClick={async () => {
              if (window.confirm('¿Eliminar este producto?')) {
                await axios.delete(`/api/admin/products/${product.id}`);
                fetchProducts();
              }
            }}>Eliminar</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductEditor;