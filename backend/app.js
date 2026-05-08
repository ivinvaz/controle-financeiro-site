const express = require('express');
const loadDatabaseConfig = require('./src/config/database');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

loadDatabaseConfig();

app.get('/', (req, res) => {
    res.json({ message: 'Servidor Express rodando!' });
});


app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});