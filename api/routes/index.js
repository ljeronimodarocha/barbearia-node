const bodyParser = require('body-parser')
const { estrategiaAutenticacao } = require('../config/estrategiaAutenticacao');
const agendamento = require('./agendamentoRouter')
const usuario = require('./usuarioRouter')
const horarios = require('./horariosRouter')
const tipo = require('./tipoRouter')
module.exports = app => {
    app.use(
        bodyParser.json(),
        bodyParser.urlencoded({ extended: true }),
        agendamento,
        usuario,
        horarios,
        tipo,
    )
}