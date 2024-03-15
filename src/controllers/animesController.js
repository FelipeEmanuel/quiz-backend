const asyncHandler = require('express-async-handler')
const Anime = require('../models/animesModel')

const getAnimes = asyncHandler(async (req, res) => {
    const animes = await Anime.find()

    res.status(200).json(animes)
})

const criarAnime = asyncHandler(async (req, res) => {

    const {name, tags} = req.body

    if (!name || !tags) {
        res.status(400)
        throw new Error('Please add all text fields!')
    } else {
        await Anime.create({
            name, tags
        })
    }

    const animes = await Anime.find()

    res.status(200).json(animes)
})

module.exports = {
    getAnimes, criarAnime
}