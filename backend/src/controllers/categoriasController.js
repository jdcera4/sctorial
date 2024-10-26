const Categoria = require('../models/Categoria');

// Agregar una nueva categoría, subcategoría o tema
exports.agregar = async (req, res) => {
  const { tipo, nombre, categoriaId, subcategoriaId } = req.body;
  try {
    if (tipo === 'Categoria') {
      const nuevaCategoria = new Categoria({ nombre });
      await nuevaCategoria.save();
    } else if (tipo === 'Subcategoria') {
      const categoria = await Categoria.findById(categoriaId);
      categoria.subcategorias.push({ nombre });
      await categoria.save();
    } else if (tipo === 'Tema') {
      const categoria = await Categoria.findById(categoriaId);
      const subcategoria = categoria.subcategorias.id(subcategoriaId);
      subcategoria.temas.push({ nombre });
      await categoria.save();
    }
    res.status(200).send("Elemento agregado con éxito");
  } catch (error) {
    res.status(500).send("Error al agregar el elemento");
  }
};

// Inactivar un elemento
exports.inactivar = async (req, res) => {
  const { categoriaId, subcategoriaId, temaId } = req.body;
  try {
    const categoria = await Categoria.findById(categoriaId);
    if (temaId) {
      const tema = categoria.subcategorias.id(subcategoriaId).temas.id(temaId);
      tema.estado = 'Inactivo';
    } else if (subcategoriaId) {
      const subcategoria = categoria.subcategorias.id(subcategoriaId);
      subcategoria.estado = 'Inactivo';
    } else {
      categoria.estado = 'Inactivo';
    }
    await categoria.save();
    res.status(200).send("Elemento inactivado");
  } catch (error) {
    res.status(500).send("Error al inactivar el elemento");
  }
};

// Eliminar un elemento sin hijos
exports.eliminar = async (req, res) => {
  const { categoriaId, subcategoriaId, temaId } = req.body;
  try {
    const categoria = await Categoria.findById(categoriaId);
    if (temaId) {
      categoria.subcategorias.id(subcategoriaId).temas.id(temaId).remove();
    } else if (subcategoriaId) {
      const subcategoria = categoria.subcategorias.id(subcategoriaId);
      if (subcategoria.temas.length === 0) subcategoria.remove();
    } else if (categoria.subcategorias.length === 0) {
      await Categoria.findByIdAndDelete(categoriaId);
    }
    await categoria.save();
    res.status(200).send("Elemento eliminado");
  } catch (error) {
    res.status(500).send("Error al eliminar el elemento");
  }
};
