const express = require('express')
const router = express.Router()
const {getAnimes, criarAnime, getAnimeById} = require('../controllers/animesController')

router.get('/', getAnimes)
router.post('/', criarAnime)
router.get('/:id', getAnimeById)

module.exports = router