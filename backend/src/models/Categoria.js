const mongoose = require('mongoose');

const CategoriaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  descripcion: {
    type: String,
  },
  subcategorias: [
    {
      nombre: String,
      descripcion: String,
    },
  ],
});

module.exports = mongoose.model('Categoria', CategoriaSchema);
