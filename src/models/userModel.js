const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
  {
    name: {type: String, required: [true, 'Please add a name'], unique: true},
    email: {type: String, required: [true, 'Please add an email'], unique: true},
    password: {type: String, required: [true, 'Please add a password']},
    role: {type: String, default: "user"},
    vitorias: {type: Number, default: 0},
    pontos: {type: Number, default: 0},
    ingame: {type: Boolean, default: false},
    xp: {type: Number, default: 0},
    nivel: {type: Number, default: 0},
    chicoins: {type: Number, default: 0},
    avatarAtual: {type: mongoose.Schema.Types.ObjectId,
      ref: "Avatares"},
    avatares: [{type: mongoose.Schema.Types.ObjectId,
      ref: "Avatares"}],
    conquistas: [{type: mongoose.Schema.Types.ObjectId,
      ref: "Conquistas"}],
    amigos: [{type: mongoose.Schema.Types.ObjectId,
      ref: "User"}]
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('User', userSchema)