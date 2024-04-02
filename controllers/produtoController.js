const express = require('express');
const Produto = require('../models/produto');

class ProdutoController {
    /*
    Esta classe é um controlador de produtos, responsável por acessar o banco de dados e retornar para quem requisitar,
    sendo possível realizar as seguintes operações:
        - Cadastrar novos produtos no banco de dados.
        - Editar produtos existentes.
        - Listar todos os produtos.
        - Buscar produtos pelo seu ID.
        - Buscar produtos com base em filtros específicos.
        - Excluir produtos pelo seu ID.
    Em suma, essa classe gerencia todas as operações relacionadas aos produtos, facilitando o acesso e a manipulação desses dados.
    */

    // O req.params.id é o valor definido na rota '/:id' o que diz que o atributo 'id' é um paremetro definido na URL
    
    // Códigos HTTP
    // STATUS_CREATED = 201;
    // STATUS_OK = 200;
    // STATUS_NOT_FOUND = 404;
    // STATUS_INTERNAL_SERVER_ERROR = 500;


    // Método para cadastrar um novo produto
    async cadastrar(req, res) {
        try {
            console.log(req.body)
            const novoProduto = new Produto(req.body);
            // O método save() do Mongoose salva um produto no MongoDB.
            // Converte o objeto JavaScript em um formato adequado para o MongoDB e tenta inserir.
            // Retorna uma promessa (Promise) que é resolvida com o produto salvo em caso de sucesso.
            const resultado = await novoProduto.save();
            res.status(201).json(resultado);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao cadastrar o produto' });
        }
    }

    // Método para editar um produto existente
    async editar(req, res) {
        try {
            const id = req.params.id;
            // O método findByIdAndUpdate() do Mongoose busca um produto pelo seu ID e o atualiza no MongoDB.
            // Recebe como argumentos o ID do produto a ser atualizado e os novos dados a serem aplicados.
            // Retorna uma promessa (Promise) que é resolvida com o produto atualizado em caso de sucesso.
            await Produto.findByIdAndUpdate(id, req.body);
            res.status(200).send();
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao editar o produto' });
        }
    }

    // Método para listar todos os produtos
    async listarTodos(req, res) {
        try {
            // O método find() do Mongoose busca os produtos com base nos filtros mandados como parâmetro, que nesse caso é vazio ({}) para puxar todos.
            const resultado = await Produto.find({});
            res.status(200).json(resultado);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao listar todos os produtos' });
        }
    }

    // Método para buscar um produto pelo seu ID
    async listarPorId(req, res) {
        try {
            const id = req.params.id;
            // O método findById() do Mongoose busca um produto no MongoDB com base no ID passado como parâmetro.
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

    // Método para listar produtos com base em filtros
    async listarPorFiltros(req, res) { // Recebe 2 parametros | Req: HTTP feita pelo cliente | Res: HTTP enviado de volta ao cliente
        try {
            const { nome, empresa, descricao, quantidade, marca, valor } = req.body; // Extrai os filtros de busca do corpo da req.
            const filtros = {};  // Cria um objeto vazio que vai ser preenchido com os filtros
            // Atributos do modelo Produto 
            if (nome) filtros.nome = nome;
            if (empresa) filtros.empresa = empresa;
            if (descricao) filtros.descricao = descricao;
            if (quantidade) filtros.quantidade = quantidade;
            if (marca) filtros.marca = marca;
            if (valor) filtros.valor = valor;

            // Esta linha usa o método find() do Mongoose para buscar produtos no banco de dados MongoDB com base nos filtros definidos, e armazena na variavel resultado
            const resultado = await Produto.find(filtros);
            if(resultado.length> 0){   // aqui vai verificar se a consulta retornou algum produto
                res.status(200).json(resultado); // Se sim envia uma resposta HTTP com status OK e os produtos no formato JSON
            }else{
                res.status(404).json("Nenhum produto encontrado com esse filtro"); // Se não envia uma resposta NOT FOUND 
            };
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao listar os produtos por filtros' }); // Aqui caso ocorra algum erro retorna um 500 Internal Server Error
        }
    }

    // Método para excluir um produto pelo seu ID
    async excluir(req, res) {  // Recebe 2 parametros | Req: HTTP feita pelo cliente | Res: HTTP enviado de volta ao cliente
        try {
            const id = req.params.id;
            // O método findByIdAndRemove() do Mongoose busca um produto pelo seu ID e o remove do MongoDB.
            // Recebe como argumento o ID do produto a ser removido.
            // Retorna uma promessa (Promise) que é resolvida com o produto removido em caso de sucesso.
            const resultado = await Produto.findByIdAndRemove(id); // Aqui ele busca e remove o produto do banco com base no ID fornecido e retorna uma promessa (Promise), que é resolvida com o produto removido em caso de sucesso.
            if (resultado) {
                res.status(200).send(); // Verifica se o resultado da operação de exclusão é válido e retorna OK
            } else {
                res.status(404).json({ error: 'Produto não encontrado' }); // Caso contrario um NotFound
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao excluir o produto' }); // E por ultimo se houver um erro retorna um 500 (Internal Server Error)
        }
    }
}

module.exports = new ProdutoController(); // Exporta a instancia do ProdutosController para que possa ser utilizada em outros arquivos do projeto