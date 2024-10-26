const express = require('express');
const router = express.Router();
const categoriaController = require('../controllers/categoriaController');

router.post('/agregar', categoriaController.agregar);
router.post('/inactivar', categoriaController.inactivar);
router.delete('/eliminar', categoriaController.eliminar);

module.exports = router;
