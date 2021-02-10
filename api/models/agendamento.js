'use strict';
const {
    Model
} = require('sequelize');
const usuario = require('./usuario');
module.exports = (sequelize, DataTypes) => {
    class Agendamento extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Agendamento.belongsTo(models.Usuario, { foreignKey: 'usuario_id' })
        }
    };
    Agendamento.init({
        dataAgendamento: DataTypes.DATE,
        dataCancelamento: DataTypes.DATE,
        ativo: DataTypes.BOOLEAN,
        id_usuario: {
            type: DataTypes.INTEGER,
            references: {
                model: usuario,
                key: 'id'
            }
        }

    }, {
        sequelize,
        modelName: 'Agendamento',
    });
    return Agendamento;
};