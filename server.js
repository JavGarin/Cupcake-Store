import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';
import path from 'path';
import { fileURLToPath } from 'url';

// 1. Configuración inicial obligatoria
dotenv.config(); // Carga las variables de entorno

// 2. Solución para 'process is not defined'
// (No necesitas hacer nada más, dotenv.config() ya hace process disponible)

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001; // Ahora process estará definido
const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:3001';
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

app.use(cors({
  origin: FRONTEND_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Proxy para las rutas de API
app.use('/api', async (req, res) => {
  try {
    const response = await axios({
      method: req.method,
      url: `${BACKEND_URL}${req.originalUrl}`,
      data: req.body,
      headers: {
        'Authorization': req.headers.authorization || ''
      }
    });
    res.status(response.status).json(response.data);
  } catch (error) {
    if (error.response) {
      // Error del backend
      res.status(error.response.status).json(error.response.data);
    } else {
      // Error de conexión
      res.status(500).json({ error: 'Error al conectar con el servidor' });
    }
  }
});

// Ruta para el frontend (SPA)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor proxy corriendo en http://localhost:${PORT}`);
  console.log(`Conectando a backend: ${BACKEND_URL}`);
  console.log(`Frontend permitido: ${FRONTEND_URL}`);
});