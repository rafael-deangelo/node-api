require("./mongodb");
const mongoose = require("mongoose");
const produtoModel = require("../models/produto");
const produto = require("./produto.json");

async function carregarDados() {
    try {
        await produtoModel.deleteMany({});
        for (const prod of produto) {
            await produtoModel.create(prod);
        }
        console.log("Carga de sub feita!");
    } catch (err) {
        console.log(err);
    } finally {
        process.exit();
    }
}

carregarDados();