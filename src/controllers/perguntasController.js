const asyncHandler = require('express-async-handler')
const Perguntas = require('../models/perguntasModel')

const getPerguntas = asyncHandler(async (req, res) => {
    const perguntas = await Perguntas.find().populate("anime", "name tags")

    res.status(200).json(perguntas)
})

const criarPergunta = asyncHandler(async (req, res) => {

    const {descricao, tags, respostacerta, opcoes, dificuldade, anime} = req.body

    if (!descricao || !tags || !respostacerta || !opcoes || !dificuldade || !anime) {
        res.status(400)
        throw new Error('Please add all text fields!')
    } else {
        await Perguntas.create({
            descricao, tags, respostacerta, opcoes, dificuldade, anime
        })
    }

    const perguntas = await Perguntas.find().populate("anime", "name tags")

    res.status(200).json(perguntas)

})

module.exports = {
    getPerguntas, criarPergunta
}