const express = require('express');
const router = express.Router();
const categoriasController = require('../controllers/categoriasController');

router.get('/', categoriasController.obtenerCategorias);
router.post('/', categoriasController.crearCategoria);
router.get('/:id', categoriasController.obtenerCategoria);
router.put('/:id', categoriasController.actualizarCategoria);
router.delete('/:id', categoriasController.eliminarCategoria);

module.exports = router;
