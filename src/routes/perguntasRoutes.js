const express = require('express')
const router = express.Router()
const {getPerguntas, criarPergunta, getPerguntasPorAnime} = require('../controllers/perguntasController')

router.get('/', getPerguntas)
router.post('/', criarPergunta)
router.get('/:id', getPerguntasPorAnime)

module.exports = router