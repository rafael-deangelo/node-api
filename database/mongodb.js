const mongoose = require('mongoose');
const URL = 'mongodb://0.0.0.0:27017/lojinha';
const db = mongoose.connect(URL);
const con = mongoose.connection;
const produtoModel = require("../models/produto");
const produto = require("./produto.json");

con.on('open', async function () {
  console.log('Conectado ao MongoDB!');
  try {
    await produtoModel.deleteMany({});
    for (const prod of produto) {
        await produtoModel.create(prod);
    }
    console.log("Carga de sub feita!");
} catch (err) {
    console.log(err);
}
});


con.on('error', function () {
  console.log('Erro na conexão com o MongoDB!');
});

con.on('close', function () {
  console.log('Desconetado do MongoDB!');
});

module.exports = db;
