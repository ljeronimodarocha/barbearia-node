'use strict';

const { Model } = require("sequelize");

module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('horarios-Livres', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            dataInicial: {
                type: Sequelize.DATE
            },
            dataFinal: {
                type: Sequelize.DATE
            },
            id_usuario: {
                allowNull: false,
                type: Sequelize.INTEGER,
                // references: { model: 'Usuario', key: 'id' }
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
    down: async(queryInterface, Sequelize) => {
        await queryInterface.dropTable('horarios-Livres');
    }
};