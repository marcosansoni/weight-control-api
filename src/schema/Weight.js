const mongoose = require('mongoose')

const { Schema } = mongoose

const weightSchema = new Schema({
  user: {
    type: String,
    required: true,
  },
  weight: {
    type: String,
    required: true,
  },
  date: { type: Date, required: true },
  note: { type: String },
})

module.exports = mongoose.model('Weight', weightSchema)
