'use strict';
const ProjetoModel = require('../database/models').Projeto;
const TarefaModel = require('../database/models').Tarefa; // Adicionando a importação do modelo de Tarefa


module.exports = {
    getAllProjetos: async () => await ProjetoModel.findAll(),
    getProjetoById: async (id) => await ProjetoModel.findByPk(id),
    createProjeto: async (newProjeto) => await ProjetoModel.create(newProjeto),
    updateProjetoById: async (id, updateProjeto) => {
        const projetoUpdate = await ProjetoModel.findByPk(id);
        if (projetoUpdate) {
            return await projetoUpdate.update(updateProjeto);
        }
        return null;
    },
    deleteProjetoById: async (id) => {
        const projetoToDelete = await ProjetoModel.findByPk(id);
        if (projetoToDelete) {
            return await projetoToDelete.destroy();
        }
        return null;
    },
    //new
    getProjetoTasks: async (projetoId) => {
        try {
            const tarefas = await TarefaModel.findAll({
                where: { projetoId }
            });

            // Conta as tarefas concluídas e não concluídas
            const tarefasProntas = tarefas.filter(tarefa => tarefa.status).length;
            const tarefasTotais = tarefas.length;

            return {
                tarefasProntas,
                tarefasTotais
            };
        } catch (error) {
            throw new Error(`Erro ao buscar tarefas para o projeto ${projetoId}: ${error.message}`);
        }
    },
    //
    createProjetoTask: async (projetoId, taskData) => {
        try {
            const projeto = await ProjetoModel.findByPk(projetoId);
            if (!projeto) {
                throw new Error('Projeto não encontrado');
            }
            const newTask = await TarefaModel.create({
                ...taskData,
                projetoId: projetoId
            });
            return newTask;
        } catch (error) {
            throw new Error(`Erro ao criar tarefa para o projeto ${projetoId}: ${error.message}`);
        }
    },

    updateProjetoTask: async (taskId, taskData) => {
        try {
            const tarefa = await TarefaModel.findByPk(taskId);
            if (!tarefa) {
                throw new Error('Tarefa não encontrada');
            }
            await tarefa.update(taskData);
            return tarefa;
        } catch (error) {
            throw new Error(`Erro ao atualizar a tarefa ${taskId}: ${error.message}`);
        }
    },

    deleteProjetoTask: async (taskId) => {
        try {
            const tarefa = await TarefaModel.findByPk(taskId);
            if (!tarefa) {
                throw new Error('Tarefa não encontrada');
            }
            await tarefa.destroy();
            return { message: 'Tarefa excluída com sucesso' };
        } catch (error) {
            throw new Error(`Erro ao excluir a tarefa ${taskId}: ${error.message}`);
        }
    }
};
