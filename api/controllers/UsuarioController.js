const passport = require('passport')
const jwt = require('jsonwebtoken');

const { UsuarioService } = require('../services');

const usuarioService = new UsuarioService();

function criaTokenJWT(usuario) {
    const payload = {
        id: usuario.id
    }
    const token = jwt.sign(payload, "ships", { expiresIn: '15m' });
    return token;
};

class UsuarioController {

    static async criaUsuario(req, res) {
        try {
            const usuario = req.body;
            return res.status(201).json(await usuarioService.cria(usuario));
        } catch (error) {
        	console.log(error)
            return res.status(500).json(error);
        }
    }
    static async listaUsuarios(req, res) {
        try {
            return res.status(200).json(await usuarioService.buscaTodosOsRegistros());
        } catch (error) {
            return res.status(500).json(error);
        }
    }
    static async pegaUmUsuario(req, res) {
        try {
            const { id } = req.params;
            return res.status(200).json(await usuarioService.buscaUmRegistro({ id }));
        } catch (error) {
            return res.status(500).json(error);
        }
    }


    static login(req, res) {
        const token = criaTokenJWT(req.user);
        res.setHeader('Authorization', token);
        return res.status(200).json({'token':token})
    }
}


module.exports = UsuarioController
