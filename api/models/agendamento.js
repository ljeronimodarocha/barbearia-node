'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Agendamento extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Agendamento.belongsToMany(models.Usuario, { foreignKey: 'id' })
        }
    };
    Agendamento.init({
        nome: DataTypes.STRING,
        email: DataTypes.STRING,
        dataAgendamento: DataTypes.DATE,
        dataCancelamento: DataTypes.DATE,
        ativo: DataTypes.BOOLEAN,

    }, {
        sequelize,
        modelName: 'Agendamento',
    });
    return Agendamento;
};