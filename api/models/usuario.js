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
            Usuario.hasMany(models.horariosLivres, { foreignKey: 'usuario_id' });
            Usuario.hasMany(models.Agendamento, { foreignKey: 'usuario_id' })
        }
    };
    Usuario.init({
        nome: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: true,
            }
        },
        email: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: true,
                isEmail: true
            }
        },
        senha: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: true,
            }
        },
        sexo: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: true,
            }
        },
        tipo: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: true,
            }
        },

    }, {
        sequelize,
        modelName: 'Usuario',
        freezeTableName: true,
    });
    return Usuario;
};