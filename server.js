import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';
import morgan from 'morgan';

// Configuración básica
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();

const app = express();
// Asegúrate que coincida con esto:
const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:3001';

// Middlewares esenciales
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(morgan('dev')); // Logger para desarrollo

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Proxy para las rutas de la API
const apiProxy = async (req, res) => {
  try {
    const url = `${BACKEND_URL}${req.originalUrl}`;
    const response = await axios({
      method: req.method,
      url,
      headers: {
        ...req.headers,
        host: new URL(BACKEND_URL).host,
        'x-forwarded-for': req.ip
      },
      data: req.body,
      validateStatus: () => true // Aceptar todos los códigos de estado
    });

    // Reenviar la respuesta del backend al frontend
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error('Error en proxy:', error);
    res.status(500).json({ 
      error: 'Error de conexión con el servidor',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Rutas de API que serán proxy al backend
app.all('/api/auth/*', apiProxy);
app.all('/api/products/*', apiProxy);
app.all('/api/cart/*', apiProxy);
app.all('/api/orders/*', apiProxy);
app.all('/api/admin/*', apiProxy);

// Ruta para obtener los productos (fallback si el backend no está disponible)
app.get('/api/products/fallback', (req, res) => {
  try {
    const products = require('./public/productos.json');
    res.json(products);
  } catch (error) {
    console.error('Error al cargar productos:', error);
    res.status(500).json({ error: 'Error al cargar productos' });
  }
});

// Ruta para el frontend (Single Page Application)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ 
    error: 'Algo salió mal',
    details: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

// Iniciar servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor frontend listo en http://localhost:${PORT}`);
  console.log(`Proxyando API a: ${BACKEND_URL}`);
});