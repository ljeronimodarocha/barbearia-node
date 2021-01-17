  const Services = require('./Services')
  const database = require('../models');
  const { Op } = require("sequelize");


  class AgendamentoService extends Services {
      constructor() {
          super('Agendamento');
      }
      async cancelarAgendamento(id) {
          return await super.atualizaUmObjeto({ ativo: false, dataCancelamento: new Date() }, {
              [Op.and]: { id, dataCancelamento: null }
          })
      }
  }

  module.exports = AgendamentoService;