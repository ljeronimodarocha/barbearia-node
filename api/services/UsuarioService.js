const bcrypt = require('bcrypt');
const Services = require("./Services")

const saltRounds = 12;
const salt = bcrypt.genSaltSync(saltRounds);

class UsuarioService extends Services {
    constructor() {
        super('Usuario');
    }
    async cria(usuario) {
        const novaSenha = bcrypt.hashSync(usuario.senha, salt);
        usuario.senha = novaSenha;
        return await super.cria(usuario);
    }


}


module.exports = UsuarioService