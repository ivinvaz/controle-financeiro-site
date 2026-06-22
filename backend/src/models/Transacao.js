const mogoose = require('mongoose');
const Usuario = require('./Usuario');
const Categoria = require('./Categoria');

const transacaoSchema = new mogoose.Schema({
    Usuario: { type: mogoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
    Categoria: { type: mogoose.Schema.Types.ObjectId, ref: 'Categoria', required: true },
    nome: { type: String, required: true },
    natureza: { type: String, required: true, enum: ['receita', 'despesa'] },
    descricao: { type: String },
    valor: { type: Number, required: true },
    dataRealizacao: { type: Date, default: Date.now },
});

module.exports = mogoose.model('Transacao', transacaoSchema);