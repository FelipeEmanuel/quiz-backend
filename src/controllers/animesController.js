const asyncHandler = require('express-async-handler')
const Anime = require('../models/animesModel')
const Perguntas = require('../models/perguntasModel')

const getAnimes = asyncHandler(async (req, res) => {
    const animes = await Anime.find()

    res.status(200).json(animes)
})

const getAnimeById = asyncHandler(async (req, res) => {
    const animes = await Anime.find({_id: req.params.id})

    res.status(200).json(animes)
})

const criarAnime = asyncHandler(async (req, res) => {

    const {name, tags} = req.body

    if (!name) {
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

const editAnime = asyncHandler(async (req, res) => {
    const anime = await Anime.findById(req.params.id)

    if(!anime) {
        res.status(400)
        throw new Error('Anime not found')
    }

    const updatedAnime = await Anime.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })
    res.status(200).json(updatedAnime)
})

const deleteAnime = asyncHandler(async (req, res) => {

    try {
        await Perguntas.deleteMany({ "anime" : req.params.id})
    } catch (error) {
        res.status(400)
        throw new Error(error)
    }

    try {
        await Anime.findByIdAndDelete(req.params.id)
        const animes = await Anime.find()
        res.status(200).json(animes)
    } catch (error) {
        res.status(400)
        throw new Error(error)
    }
    
       
})


module.exports = {
    getAnimes, criarAnime, getAnimeById, editAnime, deleteAnime,
}