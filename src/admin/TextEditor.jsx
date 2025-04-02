import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TextEditor = () => {
  const [texts, setTexts] = useState([]);
  const [editingText, setEditingText] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Obtener textos desde la API
  const fetchTexts = async () => {
    try {
      const { data } = await axios.get('/api/admin/texts', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`
        }
      });
      setTexts(data);
    } catch (error) {
      toast.error('Error al cargar textos');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTexts();
  }, []);

  // Guardar cambios
  const handleSave = async (textData) => {
    try {
      if (editingText.id) {
        await axios.put(`/api/admin/texts/${editingText.id}`, textData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('adminToken')}`
          }
        });
        toast.success('Texto actualizado');
      } else {
        await axios.post('/api/admin/texts', textData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('adminToken')}`
          }
        });
        toast.success('Texto creado');
      }
      fetchTexts();
      setEditingText(null);
    } catch (error) {
      toast.error('Error al guardar');
    }
  };

  if (isLoading) return <div className="loading-spinner">Cargando...</div>;

  return (
    <div className="text-editor-container">
      <h2>Editor de Textos</h2>
      <button 
        className="add-text-btn"
        onClick={() => setEditingText({ key: '', value: '', section: 'home' })}
      >
        + Nuevo Texto
      </button>

      {editingText && (
        <div className="text-edit-modal">
          <h3>{editingText.id ? 'Editar' : 'Crear'} Texto</h3>
          <form onSubmit={(e) => {
            e.preventDefault();
            handleSave({
              key: editingText.key,
              value: editingText.value,
              section: editingText.section
            });
          }}>
            <label>
              Clave (ID único):
              <input
                type="text"
                value={editingText.key}
                onChange={(e) => setEditingText({...editingText, key: e.target.value})}
                required
                disabled={!!editingText.id}
              />
            </label>

            <label>
              Sección:
              <select
                value={editingText.section}
                onChange={(e) => setEditingText({...editingText, section: e.target.value})}
              >
                <option value="home">Inicio</option>
                <option value="products">Productos</option>
                <option value="about">Nosotros</option>
              </select>
            </label>

            <label>
              Contenido:
              <textarea
                value={editingText.value}
                onChange={(e) => setEditingText({...editingText, value: e.target.value})}
                rows={5}
                required
              />
            </label>

            <div className="modal-actions">
              <button type="submit">Guardar</button>
              <button 
                type="button"
                onClick={() => setEditingText(null)}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="texts-grid">
        {texts.map((text) => (
          <div key={text.id} className="text-card">
            <h4>{text.key}</h4>
            <p className="section-badge">{text.section}</p>
            <div className="text-content">{text.value}</div>
            <button 
              onClick={() => setEditingText(text)}
              className="edit-btn"
            >
              Editar
            </button>
            <button 
              onClick={async () => {
                if (window.confirm('¿Eliminar este texto?')) {
                  await axios.delete(`/api/admin/texts/${text.id}`, {
                    headers: {
                      Authorization: `Bearer ${localStorage.getItem('adminToken')}`
                    }
                  });
                  fetchTexts();
                }
              }}
              className="delete-btn"
            >
              Eliminar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TextEditor;