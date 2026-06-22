const Categoria = require('../models/Categoria');

async function seedCategorias() {
    const categoriasEnv = process.env.CATEGORIAS_DE_TRANSACAO;

    if (!categoriasEnv) {
        console.warn('CATEGORIAS_DE_TRANSACAO não definido no .env — nenhuma categoria padrão será criada.');
        return;
    }

    const nomesCategorias = categoriasEnv
        .split(',')
        .map((nome) => nome.trim())
        .filter((nome) => nome.length > 0);

    for (const nome of nomesCategorias) {
        try {
            await Categoria.findOneAndUpdate(
                { nome },
                { nome },
                { upsert: true, new: true, setDefaultsOnInsert: true }
            );
        } catch (error) {
            console.error(`Erro ao criar categoria "${nome}":`, error.message);
        }
    }

    console.log(`Categorias padrão verificadas/criadas (${nomesCategorias.length} no total).`);
}

module.exports = seedCategorias;