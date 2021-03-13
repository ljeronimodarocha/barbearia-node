'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class tipoAgendamento extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            tipoAgendamento.hasMany(models.Agendamento, { foreignKey: "id" })
        }
    };
    tipoAgendamento.init({
        tempo: {
            type: DataTypes.INTEGER,
            validate: {
                notEmpty: { msg: "Favor informar um tempo válido" },
            }
        },
        nome: {
            type: DataTypes.STRING,
            unique: {
                msg: "Nome já cadastrado."
            },
            validate: {
                notEmpty: { msg: "Favor informar um nome válido" },
            }
        }
    }, {
        sequelize,
        modelName: 'TipoAgendamento',
        freezeTableName: true,
    });
    return tipoAgendamento;
};