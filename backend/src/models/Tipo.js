const mongoose = require('mongoose');

const tipoSchema = new mongoose.Schema({
    nome: { type: String, required: true, unique: true },
    descricao: { type: String },
});


module.exports = mongoose.model('Tipo', tipoSchema);