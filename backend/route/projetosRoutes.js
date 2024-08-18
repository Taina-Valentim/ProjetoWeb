//const express = require('express');
//const router = express.Router();
const Router = require("express").Router;
const projetoController = require('../controller/projetoController');

const routes = new Router();

routes.get('/', projetoController.getAllProjetos);
routes.get('/:id', projetoController.getProjetoById);
routes.post('/', projetoController.createProjeto);
routes.put('/:id', projetoController.updateProjetoById);
routes.delete('/:id', projetoController.deleteProjetoById);

// Rota para buscar tarefas de um projeto
routes.get('/:id/tarefas', projetoController.getProjectTasks);
routes.post('/:id/tarefas', projetoController.createProjectTask);
routes.put('/tarefas/:taskId', projetoController.updateProjectTask);
routes.delete('/tarefas/:taskId', projetoController.deleteProjectTask);

module.exports = routes; //module.exports = router;
