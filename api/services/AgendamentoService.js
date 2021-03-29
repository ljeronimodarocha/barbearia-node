  const Services = require('./Services');
  const database = require('../models');
  const moment = require('moment')
  const { Op } = require("sequelize");
  const { InvalidArgumentError } = require('../error/erros');

  class AgendamentoService extends Services {
      constructor() {
          super('Agendamento');
      }
      async cancelarAgendamento(id) {
          return await super.atualizaUmObjeto({ ativo: false, dataCancelamento: new Date() }, {
              [Op.and]: { id, dataCancelamento: null }
          });
      }
      async cria(objeto, user) {
          const dataInicial = new Date(objeto.dataInicial);
          const tipo = await database['TipoAgendamento'].findOne({ where: { id: parseInt(objeto.tipo) } })
          const dataFinal = moment(dataInicial).add(tipo.tempo, 'm').toDate();
          if (tipo === null) {
              throw new InvalidArgumentError("Tipo não cadastrado");
          }
          if (dataInicial > dataFinal) {
              throw new InvalidArgumentError(`A data inicial não pode ser maior que a data final!`)
          }
          const horaInicialPadrão = new Date(dataInicial);
          const horaFinalPadrão = new Date(dataFinal);
          const horarioslivres = await database['horariosLivres'].findAll({
              where: {
                  [Op.or]: [{
                      dataInicial: {
                          [Op.between]: [dataInicial,
                              dataFinal
                          ]
                      }
                  }]
              }
          })
          if (horarioslivres.lenght != 0) {
              horarioslivres.forEach(element => {
                  if (element.dataInicial <= dataInicial && ) {

                  }
              });
          }

          const agendamento = {
              dataInicial: dataInicial,
              dataFinal: dataFinal,
              id_tipoAgendamento: tipo.id,
              id_usuario: user.id
          }
          console.log(horarioslivres);
          try {
              await super.cria(agendamento)
          } catch (error) {
              throw new InvalidArgumentError(error.message)
          }

      }
  }

  module.exports = AgendamentoService;