const bcrypt = require('bcrypt');
const Usuario = require('../models/Usuario');
const jwt = require('jsonwebtoken');

async function createUsuario(req, res) {
    const { nome, email, senha, profissao} = req.body;
    if (!nome || !email || !senha) {
        return res.status(400).json({ message: 'Nome, email e senha são obrigatórios.' });
    }
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(senha, salt);
        const newUsuario = await Usuario.create({ nome, email, senha: hashedPassword, profissao });
        const { senha: _, ...usuarioData } = newUsuario.toObject();
        return res.status(201).json(usuarioData);
    } catch (error) {
        console.error('Erro ao criar usuário:', error);

        if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
            return res.status(409).json({ message: 'Email já cadastrado.' });
        }

        return res.status(500).json({ message: 'Erro ao criar usuário.' });

    }
}

async function login(req, res) {
    const { email, senha } = req.body;
    try{
        if (!email || !senha) {
            return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
        }
        const usuario = await Usuario.findOne({ email }).select('+senha');
        if (!usuario){
            return res.status(401).json({ message: 'Credenciais inválidas.' });
        }

        const isMatch = await bcrypt.compare(senha, usuario.senha);
        if (!isMatch){
            return res.status(401).json({ message: 'Credenciais inválidas.' });
        }

        const payload = { id: usuario._id, email: usuario.email, role: usuario.role, iat: Math.floor(Date.now() / 1000) };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
        const { senha: _, ...usuarioData } = usuario.toObject();
        return res.status(200).json({ message: 'Login realizado com sucesso.', token, usuario: usuarioData, payload });
    } catch (error) {
        console.error('Erro ao realizar login:', error);
        return res.status(500).json({ message: 'Erro ao realizar login.' });
    }   
}

async function updateUsuario(req, res) {
    const { id } = req.params;
    const { nome, email, senha, profissao } = req.body;
    try {
        const updateData = {};
        if (nome) updateData.nome = nome;
        if (email) updateData.email = email;
        if (profissao) updateData.profissao = profissao;
        if (senha) {
            const salt = await bcrypt.genSalt(10);
            updateData.senha = await bcrypt.hash(senha, salt);
        }
        const updatedUsuario = await Usuario.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedUsuario) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }
        const { senha: _, ...usuarioData } = updatedUsuario.toObject();
        return res.status(200).json({ message: 'Usuário atualizado com sucesso.', usuario: usuarioData });
    } catch (error) {
        if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
            return res.status(409).json({ message: 'Email já cadastrado.' });
        }
        console.error('Erro ao atualizar usuário:', error);
        return res.status(500).json({ message: 'Erro ao atualizar usuário.' });
    }
}

async function deleteUsuario(req, res) {
    const { id } = req.params;
    try {
        const deletedUsuario = await Usuario.findByIdAndDelete(id);
        if (!deletedUsuario) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }
        const { senha: _, ...usuarioData } = deletedUsuario.toObject();
        return res.status(204).json({ message: 'Usuário excluído com sucesso.', usuario: usuarioData });
    } catch (error) {
        console.error('Erro ao excluir usuário:', error);
        return res.status(500).json({ message: 'Erro ao excluir usuário.' });
    }
}

async function getUsuario(req, res) {
    const usuarios = await Usuario.find().select('-senha');
    return res.status(200).json(usuarios);
}

async function getUsuarioById(req, res) {
    const { id } = req.params;
    try {
        const usuario = await Usuario.findById(id).select('-senha');
        if (!usuario) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }
        return res.status(200).json(usuario);
    } catch (error) {
        console.error('Erro ao buscar usuário:', error);
        return res.status(500).json({ message: 'Erro ao buscar usuário.' });
    }
}

module.exports = {
    createUsuario,
    login,
    updateUsuario,
    deleteUsuario,
    getUsuario,
    getUsuarioById
};