'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Projetos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nome: {
        type: Sequelize.STRING
      },
      descricao: {
        type: Sequelize.STRING
      },
      orcamento: {
        type: Sequelize.DECIMAL
      },
      solicitante: {
        type: Sequelize.STRING
      },
      responsavel: {
        type: Sequelize.STRING
      },
      dataSolicitacao: {
        type: Sequelize.DATE
      },
      dataInicio: {
        type: Sequelize.DATE
      },
      dataEntrega: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Projetos');
  }
};