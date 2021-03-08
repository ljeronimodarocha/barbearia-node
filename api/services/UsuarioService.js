const bcrypt = require('bcrypt');
const Services = require("./Services")
const database = require('../models');

//const saltRounds = 12;
//const salt = bcrypt.genSaltSync(saltRounds);

class UsuarioService extends Services {
    constructor() {
        super('Usuario');
    }
    async cria(usuario) {
        console.log(usuario.senha);
        const novaSenha = await bcrypt.hash(usuario.senha, 12);

        usuario.senha = novaSenha;
        return await super.cria(usuario);
    }
    async buscaUmRegistro({ where }) {
        //return database['Usuario'].scope('login').findOne({ where });
        return super.buscaUmRegistroComScopo(where, 'login')
    }


}


module.exports = UsuarioService