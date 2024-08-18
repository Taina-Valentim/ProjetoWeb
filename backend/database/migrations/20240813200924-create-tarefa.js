'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Tarefas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tipo: {
        type: Sequelize.STRING
      },
      descricao: {
        type: Sequelize.STRING
      },
      dataInicio: {
        type: Sequelize.DATE
      },
      dataEntrega: {
        type: Sequelize.DATE
      },
      responsavel: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.BOOLEAN,  // Alterado para binário (0 ou 1)
        allowNull: false,  // Pode ser útil definir se deve ser obrigatório
        defaultValue: false // Valor padrão se necessário
      },
      statusDesc: {
        type: Sequelize.STRING,  // Campo adicional para descrições de status
        allowNull: true  // Permite valores nulos se não for obrigatório
      },
      projetoId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Projetos', // Nome da tabela referenciada
          key: 'id' // Chave estrangeira
        },
        //onUpdate: 'CASCADE',
        //onDelete: 'SET NULL' // Altere conforme necessário para o comportamento desejado
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
    await queryInterface.dropTable('Tarefas');
  }
};
