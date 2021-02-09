'use strict';

const { Model } = require("sequelize");

module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('horariosLivres', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            dataInicial: {
                allowNull: false,
                type: Sequelize.DATE
            },
            dataFinal: {
                allowNull: false,
                type: Sequelize.DATE
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
        });
    },
    down: async(queryInterface, Sequelize) => {
        await queryInterface.dropTable('horariosLivres');
    }
};