require("./mongodb");
// Importa o modelo de Produto definido na pasta ../models/produto
const produtoModel = require("../models/produto");
// Importa os dados de produtos a serem carregados do arquivo JSON produto.json
const produto = require("./produto.json");

async function carregarDados() {
    try {
        // Remove todos os documentos existentes na coleção de produtos
        await produtoModel.deleteMany({});
        // Itera sobre os dados de produtos importados e os insere na coleção de produtos
        for (const prod of produto) {
            await produtoModel.create(prod);
        }
        console.log("Carga de sub feita!");
    } catch (err) {
        console.log(err);
    } finally {
        // Garante que o processo seja encerrado após a execução da função
        process.exit();
    }
}

// Chama a função para carregar os dados
carregarDados();