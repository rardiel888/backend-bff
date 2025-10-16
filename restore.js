// restore.js
const { Sequelize } = require('sequelize');
const fs = require('fs');
require('dotenv').config();

// Conexión a la base de datos de Render
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
    logging: false
  }
);

// Ruta de tu backup
const backupFile = 'C:\\Users\\Rardiel Ceballo\\backup.sql'; // Ajusta si cambias ubicación

async function restoreBackup() {
  try {
    const sql = fs.readFileSync(backupFile, 'utf8');
    await sequelize.query(sql);
    console.log('✅ Backup restaurado correctamente en Render');
  } catch (error) {
    console.error('❌ Error al restaurar backup:', error);
  } finally {
    await sequelize.close();
  }
}

restoreBackup();
