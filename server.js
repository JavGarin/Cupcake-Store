import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import dotenv from 'dotenv';

// Configuración básica
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();

const app = express();

// Middlewares esenciales
app.use(cors()); // Permite todas las conexiones (en desarrollo)
app.use(express.json()); // Para parsear JSON

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para obtener los productos
app.get('/api/products', (req, res) => {
  try {
    const products = require('./public/productos.json');
    res.json(products);
  } catch (error) {
    console.error('Error al cargar productos:', error);
    res.status(500).json({ error: 'Error al cargar productos' });
  }
});

// Ruta básica de autenticación para admin
app.post('/api/admin/login', (req, res) => {
  const { email, password } = req.body;
  
  // Credenciales hardcodeadas solo para desarrollo
  if (email === 'admin1@cupcake.com' && password === 'admin123') {
    return res.json({
      success: true,
      user: {
        email: 'admin1@cupcake.com',
        name: 'Administrador',
        role: 'admin'
      }
    });
  }
  
  res.status(401).json({ error: 'Credenciales incorrectas' });
});

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// Manejo básico de errores
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Algo salió mal' });
});

// Iniciar servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor listo en http://localhost:${PORT}`);
});