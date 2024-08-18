const express = require('express');
const bodyParser = require('body-parser');
const projetosRoutes = require('./route/projetosRoutes');
const tarefasRoutes = require('./route/tarefasRoutes');
const cors = require('cors');

const app = express();
// Configuração de middleware
app.use(bodyParser.json());//parse body  json
app.use(cors());
// Definindo as rotas
app.use('/projetos', projetosRoutes);
app.use('/tarefas', tarefasRoutes);

module.exports = app;
