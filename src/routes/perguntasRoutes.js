const express = require('express')
const router = express.Router()
const {getPerguntas, criarPergunta, getPerguntasPorAnime, criarPerguntaAnime} = require('../controllers/perguntasController')

router.get('/', getPerguntas)
router.post('/', criarPergunta)
router.get('/:id', getPerguntasPorAnime)
router.post('/:id', criarPerguntaAnime)

module.exports = router