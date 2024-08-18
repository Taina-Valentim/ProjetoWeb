const express = require('express');
const router = express.Router();

const tarefaController = require('../controller/tarefaController');

// Tarefas Routes
//Por conta de usar um único routes.js, antes, aqui iam todass as de tarefas e projetos, identificando o path inteiro da request ao invés da formatação abaixo.
router.get('/', tarefaController.getAllTarefas);
router.get('/:id', tarefaController.getTarefaById);
router.post('/', tarefaController.createTarefa);
router.put('/:id', tarefaController.updateTarefaById);
router.delete('/:id', tarefaController.deleteTarefaById);

module.exports = router;
