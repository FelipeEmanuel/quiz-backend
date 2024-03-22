const mongoose = require('mongoose')

const conquistasSchema = mongoose.Schema(
  {
    nome: {type: String, default: ""},
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Conquistas', conquistasSchema)