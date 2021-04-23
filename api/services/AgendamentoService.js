  const Services = require('./Services');
  const database = require('../models');
  const moment = require('moment')
  const { Op, json } = require("sequelize");
  const { InvalidArgumentError } = require('../error/erros');

  class AgendamentoService extends Services {
      constructor() {
          super('Agendamento');
      }
      async buscaUmRegistro(where = {}) {
          return await database['TipoAgendamento'].findOne({ where: {...where } });
      }
      async cria(objeto, user) {
          const dataInicial = new Date(objeto.dataInicial);
          const tipo = await database['TipoAgendamento'].findOne({ where: { id: parseInt(objeto.tipo) } })
          if (tipo === null) {
              throw new InvalidArgumentError("Tipo não cadastrado");
          }
          const dataFinal = moment(dataInicial).add(tipo.tempo, 'm').toDate();
          if (dataInicial > dataFinal) {
              throw new InvalidArgumentError(`A data inicial não pode ser maior que a data final!`)
          }
          const horaInicialPadrão = new Date(dataInicial);
          const horaFinalPadrão = new Date(dataFinal);
          const horarioslivres = await database['horariosLivres'].findAll({
              where: {
                  [Op.or]: [{
                      dataInicial: {
                          [Op.between]: [horaInicialPadrão.setHours(0, 0, 0),
                              horaFinalPadrão.setHours(23, 59, 59)
                          ]
                      }
                  }]
              }
          })
          let ntc = false;
          for (let index = 0; index < horarioslivres.length; index++) {
              const element = horarioslivres[index].dataValues;
              if (new Date(element.dataInicial) <= dataInicial && new Date(element.dataFinal) >= dataFinal) {
                  ntc = true;
                  break;
              }
          }
          const agendamentos = await database['Agendamento'].findAll({
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
          if (agendamentos.lenght != 0) {
              for (let index = 0; index < agendamentos.length; index++) {
                  const element = agendamentos[index];
                  const cond1 = new Date(dataInicial) <= new Date(element.dataFinal) &&
                      new Date(dataInicial) >= new Date(element.dataInicial);
                  const cond2 = new Date(dataFinal) >= new Date(element.dataInicial) &&
                      new Date(dataFinal) <= new Date(element.dataFinal);
                  if (cond1 || cond2) {
                      const retornoDataInicial = moment(element.dataValues.dataInicial).format("YYYY-mm-DD HH:mm:ss");
                      const retornoDataFinal = moment(element.dataValues.dataFinal).format("YYYY-mm-DD HH:mm:ss");
                      throw new InvalidArgumentError(`Data inválida, já existe uma data neste intervalo: data inicial: ${retornoDataInicial}, data final: ${retornoDataFinal}`);
                  }

              }
          }
          if (ntc) {
              const agendamento = {
                  dataInicial: dataInicial,
                  dataFinal: dataFinal,
                  id_tipoAgendamento: tipo.id,
                  id_usuario: user.id
              }
              try {
                  console.log("criou");
                  await super.cria(agendamento);
              } catch (error) {
                  throw new InvalidArgumentError(error.message);
              }
          } else {
              throw new InvalidArgumentError("A data seleciona não entá dentro de um horário livre!");
          }
      }
      async buscaTodos(where = {}) {
          return await database[this.nomeModelo].findOne({ where: {...where }, include: 'Usuario' });
      }
  }


  module.exports = AgendamentoService;