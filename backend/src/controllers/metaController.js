const Meta = require('../models/Meta');
const Usuario = require('../models/Usuario');

async function createMeta(req, res) {
    const { meta, mes, ano } = req.body;
    const usuarioId = req.user.id;
    try {
        const usuario = await Usuario.findById(usuarioId);
        if (!usuario) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }
        if (meta <= 0) {
            return res.status(400).json({ message: 'A meta deve ser um valor positivo.' });
        }
        if (mes < 1 || mes > 12) {
            return res.status(400).json({ message: 'O mês deve ser um valor entre 1 e 12.' });
        }
        const metaExistente = await Meta.findOne({ Usuario: usuarioId, mes, ano });
        if (metaExistente) {
            return res.status(409).json({ message: 'Já existe uma meta para este mês e ano.' });
        }
        const novaMeta = await Meta.create({ Usuario: usuarioId, meta, mes, ano });
        return res.status(201).json({ message: 'Meta criada com sucesso.', meta: novaMeta });
    } catch (error) {
        console.error('Erro ao criar meta:', error);
        return res.status(500).json({ message: 'Erro ao criar meta.' });
    }
}

async function getMetas(req, res) {
    const usuarioId = req.user.id;
    try {
        const metas = await Meta.find({ Usuario: usuarioId });
        return res.status(200).json({ metas });
    } catch (error) {
        console.error('Erro ao obter metas:', error);
        return res.status(500).json({ message: 'Erro ao obter metas.' });
    }
}

async function getMetaById(req, res) {
    const { id } = req.params;
    const usuarioId = req.user.id;
    try {
        const meta = await Meta.findOne({ _id: id, Usuario: usuarioId });
        if (!meta) {
            return res.status(404).json({ message: 'Meta não encontrada.' });
        }
        return res.status(200).json({ meta });
    } catch (error) {
        console.error('Erro ao obter meta:', error);
        return res.status(500).json({ message: 'Erro ao obter meta.' });
    }
}

async function updateMeta(req, res) {
    const { id } = req.params;
    const { meta, mes, ano } = req.body;
    const usuarioId = req.user.id;
    try {
        const metaExistente = await Meta.findOne({ _id: id, Usuario: usuarioId });
        if (!metaExistente) {
            return res.status(404).json({ message: 'Meta não encontrada.' });
        }
        if (meta !== undefined) {
            if (meta <= 0) {
                return res.status(400).json({ message: 'A meta deve ser um valor positivo.' });
            }
        }
        if (mes !== undefined) {
            if (mes < 1 || mes > 12) {
                return res.status(400).json({ message: 'O mês deve ser um valor entre 1 e 12.' });
            }
        }
        if (ano !== undefined) {
            if (ano < 1) {
                return res.status(400).json({ message: 'O ano deve ser um valor positivo.' });
            }
        }
        const metaAtualizada = await Meta.findByIdAndUpdate(id, { meta, mes, ano }, { new: true });
        return res.status(200).json({ message: 'Meta atualizada com sucesso.', meta: metaAtualizada });
    } catch (error) {
        console.error('Erro ao atualizar meta:', error);
        return res.status(500).json({ message: 'Erro ao atualizar meta.' });
    }
}

async function deleteMeta(req, res) {
    const { id } = req.params;
    const usuarioId = req.user.id;
    try {
        const metaExistente = await Meta.findOne({ _id: id, Usuario: usuarioId });
        if (!metaExistente) {
            return res.status(404).json({ message: 'Meta não encontrada.' });
        }
        await Meta.findByIdAndDelete(id);
        return res.status(200).json({ message: 'Meta excluída com sucesso.' });
    } catch (error) {
        console.error('Erro ao excluir meta:', error);
        return res.status(500).json({ message: 'Erro ao excluir meta.' });
    }
}

module.exports = {
    createMeta,
    getMetas,
    getMetaById,
    updateMeta,
    deleteMeta
};