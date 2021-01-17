const passport = require('passport');
const { UsuarioService } = require('../services');
const LocalStrategy = require('passport-local').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;

const { InvalidArgumentError } = require('../error/erros');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const usuarioService = new UsuarioService();

function verificaUsuario(usuario) {
    if (!usuario) {
        throw new InvalidArgumentError('Não existe usuário com esse e-mail!');
    }
}
async function verificaTokenNaBlacklist(token) {
    const tokenNaBlacklist = await blacklist.contemToken(token);
    if (tokenNaBlacklist) {
        throw new jwt.JsonWebTokenError('Token inválido por logout!');
    }
}
async function verificaSenha(senha, senhaHash) {
    const senhaValida = await bcrypt.compare(senha, senhaHash);
    if (!senhaValida) {
        throw new InvalidArgumentError('E-mail ou senha inválidos!');
    }
}
passport.use(
    new LocalStrategy({
            usernameField: 'email',
            passwordField: 'senha',
            session: false
        },
        async(email, senha, done) => {
            try {
                const usuario = await usuarioService.buscaUmRegistro({ email });
                verificaUsuario(usuario);
                await verificaSenha(senha, usuario.senha);
                done(null, usuario);
            } catch (erro) {
                done(erro);
            }
        }
    )
);
passport.use(
    new BearerStrategy(
        async(token, done) => {
            try {
                //await verificaTokenNaBlacklist(token);
                const payload = jwt.verify(token, 'ships');
                const usuario = await usuarioService.buscaUmRegistro({ id: payload.id });
                done(null, usuario, { token: token });
            } catch (erro) {
                done(erro);
            }
        }
    )
)

module.exports = passport;