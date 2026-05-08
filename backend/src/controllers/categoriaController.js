const Categoria = require('../models/Categoria');

async function createCategoria(req, res) {
    const { nome, descricao } = req.body;
    try{
        const novaCategoria = await Categoria.create({ nome, descricao });

        return res.status(201).json({ message: 'Categoria criada com sucesso.', categoria: novaCategoria });
    } catch (error) {
        if (error.code === 11000 && error.keyPattern && error.keyPattern.nome) {
            return res.status(409).json({ message: 'Categoria já existe.' });
        }
        console.error('Erro ao criar categoria:', error);
        return res.status(500).json({ message: 'Erro ao criar categoria.' });
    }
}

async function updateCategoria(req, res) {
    const { id } = req.params;
    const { nome, descricao } = req.body;
    try {
        const updateData = {};
        if (nome) updateData.nome = nome;
        if (descricao) updateData.descricao = descricao;
        const updatedCategoria = await Categoria.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedCategoria) {
            return res.status(404).json({ message: 'Categoria não encontrada.' });
        }
        return res.status(200).json({ message: 'Categoria atualizada com sucesso.', categoria: updatedCategoria });
    } catch (error) {
        if (error.code === 11000 && error.keyPattern && error.keyPattern.nome) {
            return res.status(409).json({ message: 'Categoria já existe.' });
        }
        console.error('Erro ao atualizar categoria:', error);
        return res.status(500).json({ message: 'Erro ao atualizar categoria.' });
    }
}

async function deleteCategoria(req, res) {
    const { id } = req.params;
    try {
        const deletedCategoria = await Categoria.findByIdAndDelete(id);
        if (!deletedCategoria) {
            return res.status(404).json({ message: 'Categoria não encontrada.' });
        }
        return res.status(204).json({ message: 'Categoria excluída com sucesso.' });
    } catch (error) {
        console.error('Erro ao excluir categoria:', error);
        return res.status(500).json({ message: 'Erro ao excluir categoria.' });
    }
}

async function getCategorias(req, res) {
    const categorias = await Categoria.find();
    return res.status(200).json(categorias);
}

async function getCategoriaById(req, res) {
    const { id } = req.params;
    try {
        const categoria = await Categoria.findById(id);
        if (!categoria) {
            return res.status(404).json({ message: 'Categoria não encontrada.' });
        }
        return res.status(200).json(categoria);
    } catch (error) {   
        console.error('Erro ao buscar categoria:', error);
        return res.status(500).json({ message: 'Erro ao buscar categoria.' });
    }   
}

module.exports = {
    createCategoria,
    updateCategoria,
    deleteCategoria,
    getCategorias,
    getCategoriaById
};