const { Router } = require('express')
const middlewaresAutenticacao = require('../config/middlewaresAutenticacao')
const HorariosController = require('../controllers/horariosController')

const router = Router()
router.get('/horarios', middlewaresAutenticacao.bearer, HorariosController.buscaTodosHorarios)
router.post('/horarios', middlewaresAutenticacao.bearer, HorariosController.adicionaHorariosLivres)


module.exports = router;