const mongoose = require('mongoose')

const { Schema } = mongoose

const foodSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  externalApiId: { type: String },
})

module.exports = mongoose.model('Food', foodSchema)
