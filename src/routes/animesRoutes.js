const express = require('express')
const router = express.Router()
const {getAnimes, criarAnime} = require('../controllers/animesController')

router.get('/', getAnimes)
router.post('/', criarAnime)

module.exports = router