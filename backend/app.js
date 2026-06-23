const express = require('express');
const loadDatabaseConfig = require('./src/config/database');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');

const app = express();

const PORT = process.env.PORT || 8000;

app.use(express.json());

loadDatabaseConfig();

const routes = require('./src/routes/index');
app.use('/api', routes);

const swaggerDocument = YAML.load(
    path.join(__dirname, 'src', 'swagger.yaml')
);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});