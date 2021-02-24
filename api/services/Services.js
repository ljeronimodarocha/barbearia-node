const database = require('../models');

class Services {
    constructor(modelo) {
        this.nomeModelo = modelo;
    }
    async cria(objeto) {
        return await database[this.nomeModelo].create(objeto);
    }
    async buscaUmRegistro(where = {}) {
        return await database[this.nomeModelo].findOne({ where: {...where } });
    }
    async atualizaUmObjeto(objeto, where = {}) {
        return await database[this.nomeModelo].update(objeto, { where: {...where } });
    }
    async buscaTodosOsRegistros(where = {}) {
        return await database[this.nomeModelo].findAll({ where: {...where } });
    }
    async buscaUmRegistroComScopo(where = {}, nomeScopo) {
        return await database[this.nomeModelo].scope(nomeScopo).findOne({ where: {...where } });
    }
}

module.exports = Services;