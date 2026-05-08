const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    senha: { type: String, required: true },
    profissao: { type: String },
    role: { type: String, required: true, enum: ['admin', 'user'], default: 'user' },
    dataCriacao: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Usuario', usuarioSchema);