const express = require('express');
const loadDatabaseConfig = require('./src/config/database');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

loadDatabaseConfig();

const routes = require('./src/routes/index');
app.use('/api', routes);

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});