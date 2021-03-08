'use strict';
module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('Agendamento', {
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
            id_tipoAgendamento: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: { model: 'TipoAgendamento', key: 'id' }
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
        await queryInterface.dropTable('Agendamento');
    }
};