const Categoria = require('../models/Categoria');

// Obtener todas las categorías
exports.obtenerCategorias = async (req, res) => {
  try {
    const categorias = await Categoria.find();
    res.json(categorias);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las categorías' });
  }
};

// Crear una nueva categoría
exports.crearCategoria = async (req, res) => {
  try {
    const categoria = new Categoria(req.body);
    await categoria.save();
    res.status(201).json(categoria);
  } catch (error) {
    res.status(400).json({ error: 'Error al crear la categoría' });
  }
};

// Obtener una categoría por ID
exports.obtenerCategoria = async (req, res) => {
  try {
    const categoria = await Categoria.findById(req.params.id);
    if (!categoria) {
      return res.status(404).json({ error: 'Categoría no encontrada' });
    }
    res.json(categoria);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la categoría' });
  }
};

// Actualizar una categoría por ID
exports.actualizarCategoria = async (req, res) => {
  try {
    const categoria = await Categoria.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!categoria) {
      return res.status(404).json({ error: 'Categoría no encontrada' });
    }
    res.json(categoria);
  } catch (error) {
    res.status(400).json({ error: 'Error al actualizar la categoría' });
  }
};

// Eliminar una categoría por ID
exports.eliminarCategoria = async (req, res) => {
  try {
    const categoria = await Categoria.findByIdAndDelete(req.params.id);
    if (!categoria) {
      return res.status(404).json({ error: 'Categoría no encontrada' });
    }
    res.json({ message: 'Categoría eliminada' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la categoría' });
  }
};
