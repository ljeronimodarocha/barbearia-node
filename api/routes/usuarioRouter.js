const { Router } = require('express');
const Usuario = require('../controllers/UsuarioController');
const middlewaresAutenticacao = require('../config/middlewaresAutenticacao')

const router = Router();

router.get('/usuarios', middlewaresAutenticacao.bearer, Usuario.listaUsuarios);
router.post('/usuarios', Usuario.criaUsuario);
router.get('/usuarios/:id', middlewaresAutenticacao.bearer, Usuario.pegaUmUsuario);
router.post('/usuario/login', middlewaresAutenticacao.local, Usuario.login);

module.exports = router