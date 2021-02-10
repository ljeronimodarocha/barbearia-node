'use strict';
module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('Agendamentos', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            dataAgendamento: {
                unique: true,
                type: Sequelize.DATE
            },
            dataCancelamento: {
                unique: true,
                type: Sequelize.DATE
            },
            ativo: {
                type: Sequelize.BOOLEAN,
                defaultValue: true
            },
            id_usuario: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: { model: 'Usuario', key: 'id' }
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        }, );
    },
    down: async(queryInterface, Sequelize) => {
        await queryInterface.dropTable('Agendamentos');
    }
};