import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const BASE_URL = 'https://cupcake-store-backend-fh9c.onrender.com';

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
      const { data } = await axios.get(`${BASE_URL}/api/admin/products`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`
        }
      });
      console.log("Productos recibidos:", data);
      setProducts(data);
    } catch (error) {
      toast.error('Error al cargar productos');
      console.error("Error:", error.response?.data || error.message); 
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const headers = {
        Authorization: `Bearer ${localStorage.getItem('adminToken')}`
      };

      if (editingProduct) {
        await axios.put(`${BASE_URL}/api/admin/products/${editingProduct.id}`, formData, { headers });
        toast.success('Producto actualizado');
      } else {
        await axios.post(`${BASE_URL}/api/admin/products`, formData, { headers });
        toast.success('Producto creado');
      }

      setEditingProduct(null);
      setFormData({ name: '', description: '', price: '', image_url: '' });
      fetchProducts();
    } catch (error) {
      toast.error('Error al guardar');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Eliminar este producto?')) {
      try {
        await axios.delete(`${BASE_URL}/api/admin/products/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
        });
        fetchProducts();
      } catch (error) {
        toast.error('Error al eliminar');
      }
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  

  useEffect(() => {
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
            <button onClick={() => handleDelete(product.id)}>Eliminar</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductEditor;
