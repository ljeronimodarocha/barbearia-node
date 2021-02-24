const Services = require('./Services')
const database = require('../models');
const Sequelize = require('Sequelize')
const Op = Sequelize.Op;

class horariosService extends Services {
    constructor() {
        super('horariosLivres');
    }

    async cria(objeto) {

        if (new Date(objeto.dataInicial).toLocaleTimeString() < new Date(objeto.dataFinal).toLocaleTimeString()) {
            try {
                const horario = await database['horariosLivres'].findAll({
                    where: {
                        [Op.or]: [{
                            dataInicial: {
                                [Op.between]: ['2021-10-02 00:00:00', '2021-10-02 23:59:59']
                            }
                        }]
                    }
                })
                horario.forEach(element => {
                    if (new Date(element.dataValues.dataInicial) <= new Date(objeto.dataFinal).toLocaleTimeString && new Date(element.dataValues.dataFinal) >= new Date(objeto.dataInicial).toLocaleTimeString) {
                        console.log("Erro");
                    } else {
                        console.log("erro2");
                    }

                });


                if (horario.length == 0) {


                    console.log("criou");
                    //return await super.cria(objeto);
                } else {
                    throw new Error('Erro ao inserir');
                }
            } catch (error) {
                throw new Error(error);

            }

        }

    }
}


module.exports = horariosService