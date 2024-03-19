const mongoose = require('mongoose')

const perguntasSchema = mongoose.Schema(
  {
    descricao: {type: String, required: [true, 'Please add a name'], unique: true},
    tipos: [{type: String, required: true}],
    respostasCertas: [{type: String, required: true}],
    opcoes: [{type: String, required: true}],
    dificuldade: {type: String, required: true},
    anime: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Animes'},
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Perguntas', perguntasSchema)