const express = require('express');
const categoriasRoutes = require('./routes/categoriasRoutes');

const app = express();

app.use(express.json());

app.use('/api/categorias', categoriasRoutes);

module.exports = app;
