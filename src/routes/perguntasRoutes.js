const express = require('express')
const router = express.Router()
const {getPerguntas, criarPergunta, getPerguntasPorAnime, criarPerguntaAnime, deleteAllPerguntas} = require('../controllers/perguntasController')

router.get('/', getPerguntas)
router.post('/', criarPergunta)
router.get('/:id', getPerguntasPorAnime)
router.post('/:id', criarPerguntaAnime)
router.delete('/', deleteAllPerguntas)

module.exports = router