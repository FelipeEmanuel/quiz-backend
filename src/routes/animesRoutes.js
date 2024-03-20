const express = require('express')
const router = express.Router()
const {getAnimes, criarAnime, getAnimeById, editAnime, deleteAnime} = require('../controllers/animesController')

router.get('/', getAnimes)
router.post('/', criarAnime)
router.get('/:id', getAnimeById)
router.put('/:id', editAnime)
router.delete('/:id', deleteAnime)

module.exports = router