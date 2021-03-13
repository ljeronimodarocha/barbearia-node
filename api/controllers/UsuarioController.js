const passport = require('passport')
const jwt = require('jsonwebtoken');

const { UsuarioService } = require('../services');

const usuarioService = new UsuarioService();

function criaTokenJWT(usuario) {
    const payload = {
        id: usuario.id
    }
    const token = jwt.sign(payload, "ships", { expiresIn: '10m' });
    return token;
};

class UsuarioController {

    static async criaUsuario(req, res) {
        try {
            const usuario = req.body;
            return res.status(201).json(await usuarioService.cria(usuario));
        } catch (error) {
            const objErrors = {};
            error.errors.map((e) => {
                objErrors[e.path] = e.message;
            });
            console.log(objErrors);
            return res.status(422).json(objErrors);
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
        res.set('Authorization', token);
        return res.status(204).send(); //res.status(200).json({'token':token})
    }
}


module.exports = UsuarioController