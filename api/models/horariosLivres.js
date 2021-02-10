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

            horariosLivres.belongsTo(models.Usuario, { foreignKey: 'usuario_id' })
        }
    };
    horariosLivres.init({
        dataInicial: DataTypes.DATE,
        dataFinal: DataTypes.DATE,
        id_usuario: {
            type: DataTypes.INTEGER,
            references: {
                model: usuario,
                key: 'id'
            }
        }
    }, {
        sequelize,
        modelName: 'horariosLivres',
    });
    return horariosLivres;
};