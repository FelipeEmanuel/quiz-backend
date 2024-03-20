const express = require('express')
const router = express.Router()
const {getPerguntas, criarPergunta, getPerguntasPorAnime, criarPerguntaAnime, deleteAllPerguntas, editPergunta, deletePergunta} = require('../controllers/perguntasController')

router.get('/', getPerguntas)
router.post('/', criarPergunta)
router.get('/:id', getPerguntasPorAnime)
router.post('/:id', criarPerguntaAnime)
router.delete('/', deleteAllPerguntas)
router.delete('/:id', deletePergunta)
router.put('/:id', editPergunta)

module.exports = router