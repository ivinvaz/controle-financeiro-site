require('dotenv').config();
const mongoose = require('mongoose');
const seedCategorias = require('./seedCategorias');

function loadDatabaseConfig() {
    const dbUri = process.env.DATABASE_URL;
    if (!dbUri) {
        console.error('DATABASE_URL não está definido no arquivo .env');
        process.exit(1);
    }

    mongoose.connect(dbUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(async () => {
        console.log('Conectado ao MongoDB');
        await seedCategorias();
    })
    .catch((err) => console.error('Erro ao conectar ao MongoDB:', err));
}

module.exports = loadDatabaseConfig;