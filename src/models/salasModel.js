const mongoose = require("mongoose");

const salasModel = mongoose.Schema(
  {
    salaName: { type: String, trim: true, unique: true },
    senha: { type: String, default: "" },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    perguntas: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Perguntas",
    }],
    salaAdmin: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    qtdPerguntas: {type: Number, required: true},
    isPublic: {type: Boolean, required: true},
    maxUsers: {type: Number, required: true},
    dificuldades: [{type: String, required: true}],
    isSolo: {type: Boolean, required: true},
    tempoResposta: {type: Number, required: true},
  },
  { timestamps: true }
);

module.exports = mongoose.model("Salas", salasModel);