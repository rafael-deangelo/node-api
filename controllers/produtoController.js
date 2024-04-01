const express = require('express');
const multer = require('multer');
const upload = multer();
const Produto = require('../models/produto');

class ProdutoController {
    async cadastrar(req, res) {
        try {
            console.log(req.body);
            const novoProduto = new Produto(req.body);
            const resultado = await novoProduto.save();
            res.status(201).json(resultado);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao cadastrar o produto' });
        }
    }

    async editar(req, res) {
        try {
            const id = req.params.id;
            await Produto.findByIdAndUpdate(id, req.body);
            res.status(200).send();
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao editar o produto' });
        }
    }

    async listarTodos(req, res) {
        try {
            const resultado = await Produto.find({});
            res.status(200).json(resultado);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao listar todos os produtos' });
        }
    }

    async listarPorId(req, res) {
        try {
            const id = req.params.id;
            const resultado = await Produto.findById(id);
            if (resultado) {
                res.status(200).json(resultado);
            } else {
                res.status(404).json({ error: 'Produto não encontrado' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao buscar o produto por ID' });
        }
    }

    async listarPorFiltros(req, res) {
        try {
            const { nome, empresa, descricao, quantidade, marca, valor } = req.body;
            const filtros = {};

            if (nome) filtros.nome = nome;
            if (empresa) filtros.empresa = empresa;
            if (descricao) filtros.descricao = descricao;
            if (quantidade) filtros.quantidade = quantidade;
            if (marca) filtros.marca = marca;
            if (valor) filtros.valor = valor;
            console.log(filtros);
            const resultado = await Produto.find(filtros);
            res.status(200).json(resultado);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao listar os produtos por filtros' });
        }
    }

    async excluir(req, res) {
        try {
            const id = req.params.id;
            const resultado = await Produto.findByIdAndRemove(id);
            if (resultado) {
                res.status(200).send();
            } else {
                res.status(404).json({ error: 'Produto não encontrado' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao excluir o produto' });
        }
    }
}

module.exports = new ProdutoController();
