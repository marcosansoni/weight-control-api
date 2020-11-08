const mongoose = require('mongoose')

const { Schema } = mongoose

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  lastName: { type: String },
  firstName: { type: String },
  lastLogin: {
    type: Date,
    default: Date.now(),
  },
})

module.exports = mongoose.model('User', userSchema)
