'use strict';
const tarefaService = require('../services/tarefaService');

module.exports = {
    //new: tive que pedir isso pro GPT, porque não me ocorreu que apenas listar as tarefas não era suficiente.
    //mesmo que você possa lista-las, aparentemente se quiser listar associadas a um id de projeto,
    //Tem que criar um método/função para isso.
    //Eu fiz para não fazer gambiarras com consultas de DB ou coisas do tipo. Do jeito que está aqui:
    //É optimal? Ou ESTA é a gambiarra?
    /*
    GetProjectTasks: async (req, res) => {
        const projectId = parseInt(req.params.id, 10);
      
        try {
          const tasks = await Tarefa.findAll({
            where: { projetoId: projectId }
          });
          res.json(tasks);
        } catch (error) {
          console.error('Error fetching tasks:', error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
      },
      */
        //comentado fora, porque provavelmente isso vinha no controller dos projetos E rotas de projetos.   
    //abaixo é o que tinha antes, mas não sei mais quanto destes é realmente usado. Acho que só a criação, exclusão e update.
    getAllTarefas: async (req, res) => {
        try {
            const tarefas = await tarefaService.getAllTarefas();
            res.json(tarefas);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    getTarefaById: async (req, res) => {
        try {
            const tarefa = await tarefaService.getTarefaById(req.params.id);
            if (tarefa) {
                res.json(tarefa);
            } else {
                res.status(404).json({ error: 'Tarefa não encontrada' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    createTarefa: async (req, res) => {
        try {
            const novaTarefa = await tarefaService.createTarefa(req.body);
            res.status(201).json(novaTarefa);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
    updateTarefaById: async (req, res) => {
        try {
            const tarefaAtualizada = await tarefaService.updateTarefaById(req.params.id, req.body);
            if (tarefaAtualizada) {
                res.json(tarefaAtualizada);
            } else {
                res.status(404).json({ error: 'Tarefa não encontrada' });
            }
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
    deleteTarefaById: async (req, res) => {
        try {
            const resultado = await tarefaService.deleteTarefaById(req.params.id);
            if (resultado) {
                res.status(204).send();
            } else {
                res.status(404).json({ error: 'Tarefa não encontrada' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};
