const mongoose = require('mongoose')

const animesSchema = mongoose.Schema(
  {
    name: {type: String, required: [true, 'Please add a name'], unique: true},
    tags: [{type: String, required: true}]
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Animes', animesSchema)