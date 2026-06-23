const Usuario = require('../models/Usuario');
const Categoria = require('../models/Categoria');
const Transacao = require('../models/Transacao');

async function createTransacao(req, res) {
    const { nome, natureza, descricao, valor, dataRealizacao } = req.body;
    const { categoriaId } = req.body;
    const usuarioId = req.user.id;

    try {
        const usuario = await Usuario.findById(usuarioId);
        if (!usuario) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }
        const categoria = await Categoria.findById(categoriaId);
        if (!categoria) {
            return res.status(404).json({ message: 'Categoria não encontrada.' });
        }
        if (valor <= 0) {
            return res.status(400).json({ message: 'O valor deve ser um número positivo.' });
        }
        if (!dataRealizacao || isNaN(Date.parse(dataRealizacao))) {
            return res.status(400).json({ message: 'Data de realização inválida.' });
        }
        if (natureza !== 'receita' && natureza !== 'despesa') {
            return res.status(400).json({ message: 'A natureza deve ser "receita" ou "despesa".' });
        }
        const novaTransacao = await Transacao.create({
            Usuario: usuarioId,
            Categoria: categoriaId,
            nome,
            natureza,
            descricao,
            valor,
            dataRealizacao
        });
        return res.status(201).json({ message: 'Transação criada com sucesso.', transacao: novaTransacao });
    } catch (error) {
        console.error('Erro ao criar transação:', error);
        return res.status(500).json({ message: 'Erro ao criar transação.' });
    }
}

async function getTransacoes(req, res) {
    const usuarioId = req.user.id;
    try {
        const transacoes = await Transacao.find({ Usuario: usuarioId });
        return res.status(200).json({ transacoes });
    } catch (error) {
        console.error('Erro ao buscar transações:', error);
        return res.status(500).json({ message: 'Erro ao buscar transações.' });
    }
}

async function getTransacaoById(req, res) {
    const { id } = req.params;
    const usuarioId = req.user.id;
    try {
        const transacao = await Transacao.findOne({ _id: id, Usuario: usuarioId });
        if (!transacao) {
            return res.status(404).json({ message: 'Transação não encontrada.' });
        }
        return res.status(200).json({ transacao });
    } catch (error) {
        console.error('Erro ao buscar transação:', error);
        return res.status(500).json({ message: 'Erro ao buscar transação.' });
    }
}

async function updateTransacao(req, res) {
    const { id } = req.params;
    const { nome, natureza, descricao, valor, dataRealizacao } = req.body;
    const { categoriaId } = req.body;
    const usuarioId = req.user.id;
    try {
        const transacaoExistente = await Transacao.findOne({ _id: id, Usuario: usuarioId });
        if (!transacaoExistente) {
            return res.status(404).json({ message: 'Transação não encontrada.' });
        }
        if (categoriaId) {
            const categoria = await Categoria.findById(categoriaId);
            if (!categoria) {
                return res.status(404).json({ message: 'Categoria não encontrada.' });
            }
        }
        if (valor !== undefined && valor <= 0) {
            return res.status(400).json({ message: 'O valor deve ser um número positivo.' });
        }
        if (dataRealizacao !== undefined && isNaN(Date.parse(dataRealizacao))) {
            return res.status(400).json({ message: 'Data de realização inválida.' });
        }
        if (natureza !== undefined && natureza !== 'receita' && natureza !== 'despesa') {
            return res.status(400).json({ message: 'A natureza deve ser "receita" ou "despesa".' });
        }
        const transacaoAtualizada = await Transacao.findByIdAndUpdate(id, { nome, natureza, descricao, valor, dataRealizacao, Categoria: categoriaId }, { new: true });
        return res.status(200).json({ message: 'Transação atualizada com sucesso.', transacao: transacaoAtualizada });
    } catch (error) {
        console.error('Erro ao atualizar transação:', error);
        return res.status(500).json({ message: 'Erro ao atualizar transação.' });
    }
}

async function deleteTransacao(req, res) {
    const { id } = req.params;
    const usuarioId = req.user.id;
    try {
        const transacaoExistente = await Transacao.findOne({ _id: id, Usuario: usuarioId });
        if (!transacaoExistente) {
            return res.status(404).json({ message: 'Transação não encontrada.' });
        }
        await Transacao.findByIdAndDelete(id);
        return res.status(200).json({ message: 'Transação excluída com sucesso.' });
    } catch (error) {
        console.error('Erro ao excluir transação:', error);
        return res.status(500).json({ message: 'Erro ao excluir transação.' });
    }
}

module.exports = {
    createTransacao,
    getTransacoes,
    getTransacaoById,
    updateTransacao,
    deleteTransacao
};