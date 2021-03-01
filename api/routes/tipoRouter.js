const { Router } = require('express');
const Tipo = require('../controllers/TipoController');
const middlewaresAutenticacao = require('../config/middlewaresAutenticacao')

const router = Router();
router.get('/tipos', middlewaresAutenticacao.bearer, Tipo.listaTipos);
router.post('/tipos', middlewaresAutenticacao.bearer, Tipo.criaTipo)


module.exports = router;