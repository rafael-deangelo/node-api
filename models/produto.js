const mongoose = require('mongoose'); // Utilizamos o Mongoose que é uma biblioteca de modelagem de dados MongoDB

// Definimos o esquema para documentos de produtos no mongo
const produtoSchema = new mongoose.Schema({ // aqui dentro é onde passamos um objeto que define os campos do documento e seus tipos de dados.
    nome: String,
    empresa: String,
    descricao: String,
    quantidade: Number,
    marca: String,
    valor: Number
});

module.exports = mongoose.model('Produto', produtoSchema); // Exportamos o modelo de produto para ser utilizado em outras parte do código
// Usamos o mongoose.model para compilar um modelo a partir do esquema fornecido. 
// Aqui, estamos compilando um modelo chamado 'Produto' com base no esquema produtoSchema.
// Permitimos que outros arquivos acessem e interajam com produto no banco de dados.
