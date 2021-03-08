'use strict';
const {
    Model
} = require('sequelize');
const usuario = require('./usuario');
module.exports = (sequelize, DataTypes) => {
    class horariosLivres extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            horariosLivres.belongsTo(models.Usuario, { foreignKey: 'id_usuario' })
        }
    };
    horariosLivres.init({
        dataInicial: {
            type: DataTypes.DATE,
            validate: {
                isDate: true,
            }
        },
        dataFinal: DataTypes.DATE,
        id_usuario: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Usuario',
                key: 'id'
            }
        }
    }, {
        sequelize,
        modelName: 'horariosLivres',
        freezeTableName: true,
    });
    return horariosLivres;
};