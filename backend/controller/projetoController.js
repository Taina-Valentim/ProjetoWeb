'use strict';
const projetoService = require('../services/projetoService');
const { Projeto, Tarefa } = require('../database/models');
//const { Tarefa } = require('../models');


module.exports = {

    
    getAllProjetos: async (req, res) => {
        try {
            const projetos = await projetoService.getAllProjetos();
            res.json(projetos);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    getProjetoById: async (req, res) => {
        try {
            const projeto = await projetoService.getProjetoById(req.params.id);
            if (projeto) {
                res.json(projeto);
            } else {
                res.status(404).json({ error: 'Projeto não encontrado' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    createProjeto: async (req, res) => {
        try {
            const novoProjeto = await projetoService.createProjeto(req.body);
            res.status(201).json(novoProjeto);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
    updateProjetoById: async (req, res) => {
        try {
            const projetoAtualizado = await projetoService.updateProjetoById(req.params.id, req.body);
            if (projetoAtualizado) {
                res.json(projetoAtualizado);
            } else {
                res.status(404).json({ error: 'Projeto não encontrado' });
            }
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
    deleteProjetoById: async (req, res) => {
        try {
            const resultado = await projetoService.deleteProjetoById(req.params.id);
            if (resultado) {
                res.status(204).send();
            } else {
                res.status(404).json({ error: 'Projeto não encontrado' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    //new
    getProjectTasks: async (req, res) => {
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
    //
    createProjectTask: async (req, res) => {
        try {
            const newTask = await projetoService.createProjetoTask(req.params.id, req.body);
            res.status(201).json(newTask);
        } catch (error) {
            console.error('Error creating task:', error);
            res.status(400).json({ error: error.message });
        }
    },

    updateProjectTask: async (req, res) => {
        try {
            const updatedTask = await projetoService.updateProjetoTask(req.params.taskId, req.body);
            if (updatedTask) {
                res.json(updatedTask);
            } else {
                res.status(404).json({ error: 'Tarefa não encontrada' });
            }
        } catch (error) {
            console.error('Error updating task:', error);
            res.status(400).json({ error: error.message });
        }
    },

    deleteProjectTask: async (req, res) => {
        try {
            const result = await projetoService.deleteProjetoTask(req.params.taskId);
            res.status(204).send();
        } catch (error) {
            console.error('Error deleting task:', error);
            res.status(500).json({ error: error.message });
        }
    }
    //
};
