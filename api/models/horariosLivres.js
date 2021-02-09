'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class horariosLivres extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here

            horariosLivres.belongsToMany(models.Usuario, { foreignKey: 'id' })
        }
    };
    horariosLivres.init({
        dataInicial: DataTypes.DATE,
        dataFinal: DataTypes.DATE,

    }, {
        sequelize,
        modelName: 'horariosLivres',
    });
    return horariosLivres;
};