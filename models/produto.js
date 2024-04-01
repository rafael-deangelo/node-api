const { Double } = require('mongodb');
const mongoose = require('mongoose');

const produtoSchema = new mongoose.Schema({
    nome: String,
    empresa: String,
    descricao: String,
    quantidade: Number,
    marca: String,
    valor: Number
});

module.exports = mongoose.model('Produto', produtoSchema);

