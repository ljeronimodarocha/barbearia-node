const { Router } = require('express')
const middlewaresAutenticacao = require('../config/middlewaresAutenticacao')
const Agendamento = require('../controllers/AgendamentoController')

const router = Router()
router.get('/agendamentos', middlewaresAutenticacao.bearer, Agendamento.listaAgendamentos)
router.post('/agendamentos', middlewaresAutenticacao.bearer, Agendamento.adicionaAgendamento)
router.put('/agendamentos/:id', middlewaresAutenticacao.bearer, Agendamento.atualizaAgendamento)
router.get('/agendamentos/:id', middlewaresAutenticacao.bearer, Agendamento.pegaUmRegistro)
router.get('/agendamentos/:id/cancelar', middlewaresAutenticacao.bearer, Agendamento.cancelarAgendamento)

module.exports = router;