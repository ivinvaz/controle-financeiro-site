const Tipo = require('../models/Tipo');

async function createTipo(req, res) {
    const { nome, descricao } = req.body;
    try{
        const tipoExistente = await Tipo.findOne({ nome });
        if (tipoExistente) {
            return res.status(409).json({ message: 'Tipo já existe.' });
        }
        const novoTipo = await Tipo.create({ nome, descricao });
        return res.status(201).json({ message: 'Tipo criado com sucesso.', tipo: novoTipo });
    } catch (error) {
        console.error('Erro ao criar tipo:', error);
        return res.status(500).json({ message: 'Erro ao criar tipo.' });
    }
}

async function updateTipo(req, res) {
    const { id } = req.params;
    const { nome, descricao } = req.body;
    try {
        const tipoExistente = await Tipo.findOne({ nome, _id: { $ne: id } });
        if (tipoExistente) {
            return res.status(409).json({ message: 'Tipo já existe.' });
        }
        const updatedTipo = await Tipo.findByIdAndUpdate(id, { nome, descricao }, { new: true });
        return res.status(200).json({ message: 'Tipo atualizado com sucesso.', tipo: updatedTipo });
    } catch (error) {
        if (error.code === 11000 && error.keyPattern && error.keyPattern.nome) {
            return res.status(409).json({ message: 'Tipo já existe.' });
        }
        console.error('Erro ao atualizar tipo:', error);
        return res.status(500).json({ message: 'Erro ao atualizar tipo.' });
    }
}

async function deleteTipo(req, res) {
    const { id } = req.params;
    try {
        const deletedTipo = await Tipo.findByIdAndDelete(id);
        if (!deletedTipo) {
            return res.status(404).json({ message: 'Tipo não encontrado.' });
        }
        return res.status(200).json({ message: 'Tipo excluído com sucesso.' });
    } catch (error) {
        console.error('Erro ao excluir tipo:', error);
        return res.status(500).json({ message: 'Erro ao excluir tipo.' });
    }
}

async function getTipos(req, res) {
    try {
        const tipos = await Tipo.find();
        return res.status(200).json(tipos);
    } catch (error) {
        console.error('Erro ao obter tipos:', error);
        return res.status(500).json({ message: 'Erro ao obter tipos.' });
    }
}

async function getTipoById(req, res) {
    const { id } = req.params;
    try {
        const tipo = await Tipo.findById(id);
        if (!tipo) {
            return res.status(404).json({ message: 'Tipo não encontrado.' });
        }
        return res.status(200).json(tipo);
    } catch (error) {
        console.error('Erro ao obter tipo:', error);
        return res.status(500).json({ message: 'Erro ao obter tipo.' });
    }
}

module.exports = {
    createTipo,
    updateTipo,
    deleteTipo,
    getTipos,
    getTipoById
};      
