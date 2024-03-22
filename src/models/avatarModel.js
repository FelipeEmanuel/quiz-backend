const mongoose = require('mongoose')

const avataresSchema = mongoose.Schema(
  {
    name: {type: String, default: ""}
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Avatares', avataresSchema)