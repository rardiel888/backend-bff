const express = require('express');
const cors = require('cors');
const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Conexión a PostgreSQL usando variables de entorno
const sequelize = new Sequelize(
  process.env.DB_NAME=ejemplo_bff,
  process.env.DB_USER=ejemplo_bff_user,
  process.env.DB_PASSWORD=dpg-d3ogsbeuk2gs73cqkr50-a.oregon-postgres.render.com,
  {
    host: process.env.DB_HOST=dpg-d3ogsbeuk2gs73cqkr50-a.oregon-postgres.render.com,
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
