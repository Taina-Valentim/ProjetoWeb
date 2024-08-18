'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Projeto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Projeto.hasMany(models.Tarefa);
    }
  }
  Projeto.init({
    nome: DataTypes.STRING,
    descricao: DataTypes.STRING,
    orcamento: DataTypes.DECIMAL,
    solicitante: DataTypes.STRING,
    responsavel: DataTypes.STRING,
    dataSolicitacao: DataTypes.DATE,
    dataInicio: DataTypes.DATE,
    dataEntrega: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Projeto',
  });
  return Projeto;
};