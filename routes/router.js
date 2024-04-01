const express = require('express');
const multer = require('multer');
const produtoController = require('../controllers/produtoController');

const router = express.Router();
const upload = multer();

router.post('/produtos',  produtoController.cadastrar);
router.put('/produtos/:id',  produtoController.editar);
router.get('/produtos', produtoController.listarTodos);
router.get('/:id', produtoController.listarPorId);
router.get('/produtos/filter', produtoController.listarPorFiltros);
router.delete('/produtos/:id', produtoController.excluir);

module.exports = router;
