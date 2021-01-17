const bodyParser = require('body-parser')
const { estrategiaAutenticacao } = require('../config/estrategiaAutenticacao');
const agendamento = require('./agendamentoRouter')
const usuario = require('./usuarioRouter')
module.exports = app => {
    app.use(
        bodyParser.json(),
        bodyParser.urlencoded({ extended: true }),
        agendamento,
        usuario,
    )
}