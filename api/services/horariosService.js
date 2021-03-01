const Services = require('./Services')
const database = require('../models');
const Sequelize = require('Sequelize')
const Op = Sequelize.Op;

const { InvalidArgumentError } = require('../error/erros');
const moment = require('moment');

class horariosService extends Services {
    constructor() {
        super('horariosLivres');
    }
    async cria(objeto) {
        const dataInicial = new Date(objeto.dataInicial);
        const dataFinal = new Date(objeto.dataFinal);
        if (dataInicial < dataFinal) {
            const horaInicialPadrão = dataInicial.setHours(0, 0, 0)
            const horaFinalPadrão = dataFinal.setHours(23, 59, 59)
            const horario = await database['horariosLivres'].findAll({
                where: {
                    [Op.or]: [{
                        dataInicial: {
                            [Op.between]: [horaInicialPadrão,
                                horaFinalPadrão
                            ]
                        }
                    }]
                }
            })
            if (horario.lenght != 0) {
                horario.forEach(element => {
                    if (new Date(element.dataValues.dataInicial) <= new Date(objeto.dataFinal) && new Date(element.dataValues.dataFinal) >= new Date(objeto.dataInicial)) {
                        const retornoDataInicial = moment(element.dataValues.dataInicial).format("YYYY-mm-DD HH:mm:ss")
                        const retornoDataFinal = moment(element.dataValues.dataFinal).format("YYYY-mm-DD HH:mm:ss")
                        throw new InvalidArgumentError(`Data inválida, já existe uma data neste intervalo: data inicial: ${retornoDataInicial}, data final: ${retornoDataFinal}`)
                    }
                });

            }
            return await super.cria(objeto);
        } else {
            throw new InvalidArgumentError(`A data inicial não pode ser maior que a data final!`)
        }
    }
}


module.exports = horariosService