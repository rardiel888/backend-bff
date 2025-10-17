const express = require('express'); 
const cors = require('cors');
const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

const app = express();
app.use(cors()); // Permite conexiones desde cualquier origen (Vercel)
app.use(express.json());

// Conexión a PostgreSQL usando variables de entorno
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  }
);

// Modelo de usuarios
const Usuario = sequelize.define('Usuario', {
  nombre: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false }
}, { 
  tableName: 'usuarios',
  timestamps: false
});

// Ruta BFF para obtener usuarios
app.get('/api/usuarios', async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Nueva ruta BFF para crear usuarios desde el frontend
app.post('/api/usuarios', async (req, res) => {
  try {
    const { nombre, email } = req.body;

    // Validación básica
    if (!nombre || !email) {
      return res.status(400).json({ error: 'Nombre y email son obligatorios' });
    }

    // Crear el usuario en la base de datos
    const nuevoUsuario = await Usuario.create({ nombre, email });
    res.status(201).json(nuevoUsuario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexión a PostgreSQL exitosa');
    console.log(`Servidor corriendo en puerto ${PORT}`);
  } catch (error) {
    console.error('❌ No se pudo conectar a PostgreSQL:', error);
  }
});

