const mongoose = require('mongoose')

const perguntasSchema = mongoose.Schema(
  {
    descricao: {type: String, required: [true, 'Please add a name'], unique: true},
    tags: {type: Array, required: true},
    respostacerta: {type: Array, required: true},
    opcoes: {type: Array, required: true},
    dificuldade: {type: String, required: true},
    anime: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Animes'},
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Perguntas', perguntasSchema)