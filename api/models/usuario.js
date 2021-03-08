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
            Usuario.hasMany(models.horariosLivres, { foreignKey: 'id' });
            Usuario.hasMany(models.Agendamento, { foreignKey: 'id' })
        }
    };
    Usuario.init({
        nome: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: { msg: "Favor informar um nome." },
            }
        },
        email: {
            type: DataTypes.STRING,
            unique: {
                msg: "E-mail já cadastrado."
            },
            validate: {
                notEmpty: { msg: "Favor informar um e-mail válido" },
                isEmail: { msg: "Favor informar um e-mail válido" }
            }
        },
        senha: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: {
                    args: true,
                    msg: "Required"
                }
            }
        },
        sexo: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: { args: true, msg: "Required" },
                isIn: {
                    args: [
                        ['M', 'F'],
                    ],
                    msg: "Valor deve ser M ou F"
                }
            }
        },
        tipo: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: true,
                isIn: {
                    args: [
                        ['cliente', 'funcionario']
                    ],
                    msg: "Valor deve ser cliente ou funcionario"
                }
            }
        },

    }, {
        defaultScope: {
            attributes: { exclude: ['senha', 'updatedAt', 'createdAt'] }
        },
        scopes: {
            login: {

            }
        },
        sequelize,
        modelName: 'Usuario',
        freezeTableName: true,
    });
    return Usuario;
};