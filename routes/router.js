const express = require('express');
const multer = require('multer');
const produtoController = require('../controllers/produtoController');

const router = express.Router();
const upload = multer();

router.post('/produtos',  produtoController.cadastrar);  // DIOGO
router.put('/produtos/:id',  produtoController.editar);  // DIOGO
router.get('/produtos/findAll', produtoController.listarTodos);  // BRUNO
router.get('/produtos/findById/:id', produtoController.listarPorId);       // BRUNO
router.get('/produtos/filter', produtoController.listarPorFiltros);  // RAFAEL
router.delete('/produtos/:id', produtoController.excluir);  // RAFAEL

module.exports = router;
