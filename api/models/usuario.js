'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Usuario extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Usuario.hasMany(models.horariosLivres);
            Usuario.hasMany(models.Agendamento)
        }
    };
    Usuario.init({
        nome: DataTypes.STRING,
        email: DataTypes.STRING,
        senha: DataTypes.STRING,
        sexo: DataTypes.STRING,
        funcao: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Usuario',
        freezeTableName: true,
    });
    return Usuario;
};