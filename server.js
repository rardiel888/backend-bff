const express = require('express');
const cors = require('cors');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();
app.use(cors());
app.use(express.json());

//Conexión a PostgreSQL
const sequelize = new Sequelize('ejemplo_bff', 'postgres', 'randycairo17', {
  host: 'localhost',
  dialect: 'postgres',
});

//Modelo de usuarios
const Usuario = sequelize.define('Usuario', {
  nombre: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false }
}, {
  tableName: 'usuarios',
  timestamps: false
});

//Ruta BFF para obtener usuarios
app.get('/api/usuarios', async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Iniciar servidor
const PORT = 3000;
app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión a PostgreSQL exitosa');
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  } catch (error) {
    console.error('No se pudo conectar a PostgreSQL:', error);
  }
});
