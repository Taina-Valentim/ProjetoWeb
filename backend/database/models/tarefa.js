'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tarefa extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Tarefa.belongsTo(models.Projeto);
    }
  }
  Tarefa.init({
    tipo: DataTypes.STRING,
    descricao: DataTypes.STRING,
    dataInicio: DataTypes.DATE,
    dataEntrega: DataTypes.DATE,
    responsavel: DataTypes.STRING,
    status: {
      type: DataTypes.ENUM('não concluída', 'concluída'),
      allowNull: false
    },
    statusDesc: DataTypes.STRING,  // Descrição que aaaantes era o status, mas agora é um campo adicional.
    projetoId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Tarefa',
  });
  return Tarefa;
};
