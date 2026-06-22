const mongoose = require('mongoose');
const Usuario = require('./Usuario');

const metaSchema = new mongoose.Schema({
    Usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
    nome: { type: String, required: true },
    meta: { type: Number, required: true },
    mes: { type: Number, required: true },
    ano: { type: Number, required: true },
});

module.exports = mongoose.model('Meta', metaSchema);