const express = require('express');
const categoriasRoutes = require('./routes/categoriasRoutes');

const app = express();

// Middleware
app.use(express.json());

// Rutas
app.use('/api/categorias', categoriasRoutes);

module.exports = app;
