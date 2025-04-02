import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { Pool } from 'pg';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

// Configuración inicial
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();

const app = express();
app.use(express.json()); // Para parsear JSON en las requests

// Conexión a PostgreSQL
const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'cupcake_store',
  password: process.env.DB_PASSWORD || 'tu_contraseña',
  port: process.env.DB_PORT || 5432,
});

// Middleware de autenticación
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET || 'tu_secreto_seguro', (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// --- Endpoints de Administración --- //
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const { rows } = await pool.query(
      'SELECT * FROM admin_users WHERE email = $1', 
      [email]
    );
    
    if (!rows.length || !bcrypt.compareSync(password, rows[0].password_hash)) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const token = jwt.sign(
      { id: rows[0].id, role: rows[0].role }, 
      process.env.JWT_SECRET, 
      { expiresIn: '8h' }
    );
    
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

app.get('/api/admin/texts', authenticateToken, async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM dynamic_texts');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Database error' });
  }
});

app.post('/api/admin/texts', authenticateToken, async (req, res) => {
  const { key, value, section } = req.body;
  try {
    const { rows } = await pool.query(
      `INSERT INTO dynamic_texts (key, value, section) 
       VALUES ($1, $2, $3) 
       RETURNING *`,
      [key, value, section]
    );
    res.status(201).json(rows[0]);
  } catch (error) {
    res.status(400).json({ error: 'Error creating text' });
  }
});

app.put('/api/admin/texts/:id', authenticateToken, async (req, res) => {
  const { value, section } = req.body;
  try {
    const { rows } = await pool.query(
      `UPDATE dynamic_texts 
       SET value = $1, section = $2, updated_at = NOW() 
       WHERE id = $3 
       RETURNING *`,
      [value, section, req.params.id]
    );
    res.json(rows[0]);
  } catch (error) {
    res.status(400).json({ error: 'Error updating text' });
  }
});

// Endpoint protegido para productos
app.get('/api/admin/products', authenticateToken, async (req, res) => {
  if (req.user.role !== 'admin') return res.sendStatus(403);
  
  try {
    const { rows } = await pool.query('SELECT * FROM products');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener productos' });
  }
});

// --- Endpoints Públicos Existente --- //
app.get('/api/products', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'productos.json'));
});

// --- Servir Frontend --- //
app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Iniciar servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  console.log(`Endpoints admin en /api/auth/login y /api/admin/*`);
});