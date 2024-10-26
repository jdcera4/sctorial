const mongoose = require('mongoose');

const TemaSchema = new mongoose.Schema({
  nombre: String,
  estado: { type: String, enum: ['Activo', 'Inactivo'], default: 'Activo' }
});

const SubcategoriaSchema = new mongoose.Schema({
  nombre: String,
  estado: { type: String, enum: ['Activo', 'Inactivo'], default: 'Activo' },
  temas: [TemaSchema]
});

const CategoriaSchema = new mongoose.Schema({
  nombre: String,
  estado: { type: String, enum: ['Activo', 'Inactivo'], default: 'Activo' },
  subcategorias: [SubcategoriaSchema]
});

module.exports = mongoose.model('Categoria', CategoriaSchema);
