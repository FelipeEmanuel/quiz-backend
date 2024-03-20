const asyncHandler = require('express-async-handler')
const Perguntas = require('../models/perguntasModel')

const getPerguntas = asyncHandler(async (req, res) => {
    const perguntas = await Perguntas.find().populate("anime", "name tags")

    res.status(200).json(perguntas)
})

const criarPergunta = asyncHandler(async (req, res) => {

    const {descricao, tipos, respostasCertas, opcoes, dificuldade, anime} = req.body

    if (!descricao || !tipos || !respostasCertas || !opcoes || !dificuldade || !anime) {
        res.status(400)
        throw new Error('Please add all text fields!')
    } else {
        await Perguntas.create({
            descricao, tipos, respostasCertas, opcoes, dificuldade, anime
        })
    }
        
    const perguntas = await Perguntas.find().populate("anime", "name tags")

    res.status(200).json(perguntas)

})

const getPerguntasPorAnime = asyncHandler(async (req, res) => {

    const perguntas = await Perguntas.find({anime: req.params.id}).populate("anime", "name")

    res.status(200).json(perguntas)

})


const criarPerguntaAnime = asyncHandler(async (req, res) => {

    const {descricao, tipos, respostasCertas, opcoes, dificuldade} = req.body


    if (!descricao || !dificuldade) {
        res.status(400)
        throw new Error('Please add all text fields!')
    } else {
        await Perguntas.create({
            descricao, tipos, respostasCertas, opcoes, dificuldade, anime:req.params.id
        })
    }
        
    const perguntas = await Perguntas.find({anime:req.params.id}).populate("anime", "name")

    res.status(200).json(perguntas)
    
})

const deleteAllPerguntas = asyncHandler(async (req, res) => {

    const perguntas = await Perguntas.deleteMany()

    res.status(200).json(perguntas)
})

const editPergunta = asyncHandler(async (req, res) => {
    const pergunta = await Perguntas.findById(req.params.id)

    if(!pergunta) {
        res.status(400)
        throw new Error('Pergunta not found')
    }

    const updatedPergunta = await Perguntas.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })
    res.status(200).json(updatedPergunta)
})

const deletePergunta = asyncHandler(async (req, res) => {

    try {
        await Perguntas.findByIdAndDelete(req.params.id)
        const perguntas = await Perguntas.find()
        res.status(200).json(perguntas)
    } catch (error) {
        res.status(400)
        throw new Error(error)
    }
    
       
})

module.exports = {
    getPerguntas, criarPergunta, getPerguntasPorAnime, criarPerguntaAnime, deleteAllPerguntas, editPergunta, deletePergunta
}