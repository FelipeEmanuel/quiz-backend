const express = require('express')
const router = express.Router()
const {getPerguntas, criarPergunta} = require('../controllers/perguntasController')

router.get('/', getPerguntas)
router.post('/', criarPergunta)

module.exports = router