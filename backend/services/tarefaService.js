'use strict';
const TarefaModel = require('../database/models').Tarefa;

module.exports = {
    getAllTarefas: async () => await TarefaModel.findAll(),
    getTarefaById: async (id) => await TarefaModel.findByPk(id),
    createTarefa: async (newTarefa) => await TarefaModel.create(newTarefa),
    updateTarefaById: async (id, updateTarefa) => {
        const tarefaUpdate = await TarefaModel.findByPk(id);
        if (tarefaUpdate) {
            return await tarefaUpdate.update(updateTarefa);
        }
        return null;
    },
    deleteTarefaById: async (id) => {
        const tarefaToDelete = await TarefaModel.findByPk(id);
        if (tarefaToDelete) {
            return await tarefaToDelete.destroy();
        }
        return null;
    }
};
