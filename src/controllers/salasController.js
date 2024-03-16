const asyncHandler = require('express-async-handler')
const Sala = require('../models/salasModel')
const Perguntas = require('../models/perguntasModel')

async function getListaPerguntas(qtdPerguntas) {

    const listaPerguntas = await Perguntas.find({}).limit(qtdPerguntas).populate("anime", "name")

    return listaPerguntas
}

const criarSala = asyncHandler(async (req, res) => {

    let user = req.user.id
    let listaPerguntas = await getListaPerguntas(req.body.qtdPerguntas)

    if(req.body.isPublic == false) {
        if(!req.body.salaName || !req.body.senha) {
            res.status(400)
            throw new Error('Please add all text fields!')
        } else {
            try {
                const sala = await Sala.create({
                   salaName: req.body.salaName,
                   senha:  req.body.senha,
                   users: user,
                   perguntas: listaPerguntas,
                   qtdPerguntas: req.body.qtdPerguntas,
                   salaAdmin: req.user,
                   isPublic: req.body.isPublic,
                   maxUsers: req.body.maxUsers  
                });

                const fullSala = await Sala.findOne({ _id: sala._id})
                .populate("users", "-password")
                .populate("salaAdmin", "-password")
                .populate("perguntas", "descricao tags respostacerta opcoes dificuldade anime")

                res.status(200).json(fullSala);
            } catch (error) {
                res.status(400)
                throw new Error(error.message)
            }
        }
    } else {
        if(!req.body.salaName) {
            res.status(400)
            throw new Error('Please add a name!')
        } else {
            try {
                const sala = await Sala.create({
                   salaName: req.body.salaName,
                   users: user,
                   perguntas: listaPerguntas,
                   qtdPerguntas: req.body.qtdPerguntas,
                   salaAdmin: req.user,
                   isPublic: req.body.isPublic,
                   maxUsers: req.body.maxUsers 
                });

                const fullSala = await Sala.findOne({ _id: sala._id})
                .populate("users", "-password")
                .populate("salaAdmin", "-password")
                .populate("perguntas", "descricao tags respostacerta opcoes dificuldade anime")

                res.status(200).json(fullSala);
            } catch (error) {
                res.status(400)
                throw new Error(error.message)
            }
        }
    }
    
})

const getSalas = asyncHandler(async (req, res) => {
    const salas = await Sala.find()

    res.status(200).json(salas)
})

const entrarNaSala = asyncHandler(async (req, res) => {
   
    let user = req.user.id 
    const acharSala = await Sala.findById(req.body.salaId);

    if(acharSala.isPublic == false) {
        if(req.body.senha == "") {
            res.status(400)
            throw new Error('Tem que ter senha paizão');
        } else {
            if(!acharSala) {
                res.status(404)
                throw new Error("Sala not found");
            } else {
                const added = await Sala.findByIdAndUpdate(
                    acharSala._id,
                    {
                        $push: { users: user}
                    },
                    { new: true}
                )
                .populate("users", "_id name")
                .populate("salaAdmin", "_id name")
                .populate("perguntas", "descricao tags respostacerta opcoes dificuldade anime");
                res.status(200).json(added);
            }
            
        }
    } else {
        if(!acharSala) {
            res.status(404)
            throw new Error("Sala not found");
        } else {
            const added = await Sala.findByIdAndUpdate(
                acharSala._id,
                {
                    $push: { users: user}
                },
                { new: true}
            )
            .populate("users", "_id name")
            .populate("salaAdmin", "_id name")
            .populate("perguntas", "descricao tags respostacerta opcoes dificuldade anime");
            res.status(200).json(added);
        }
    }
    
})

const removerDaSala = asyncHandler(async (req, res) => {
    
    let user = req.body.userId 
    const acharSala = await Sala.findById(req.body.salaId);

    
    if(!acharSala) {
        res.status(404)
        throw new Error("Sala not found");
    } else {
        const removed = await Sala.findByIdAndUpdate(
            acharSala._id,
            {
                $pull: { users: user}
            },
            { new: true}
        )
        .populate("users", "_id name")
        .populate("salaAdmin", "_id name")
        .populate("perguntas", "descricao tags respostacerta opcoes dificuldade anime");
        res.status(200).json(removed);
    }
            
})

module.exports = {
    getSalas, criarSala, entrarNaSala, removerDaSala
}