'use strict';
const {
    Model
} = require('sequelize');
const usuario = require('./usuario');
const tipoAgendamento = require('./tipoAgendamento');
module.exports = (sequelize, DataTypes) => {
    class Agendamento extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Agendamento.belongsTo(models.Usuario, { foreignKey: 'id_usuario' })
            Agendamento.belongsTo(models.TipoAgendamento, { foreignKey: 'id_tipoAgendamento' })
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
        },
        id_tipoAgendamento: {
            type: DataTypes.INTEGER,
            references: {
                model: tipoAgendamento,
                key: 'id'
            }
        }

    }, {
        sequelize,
        modelName: 'Agendamento',
        freezeTableName: true,
    });
    return Agendamento;
};