const jwt = require('jsonwebtoken')
const { missingTokenError } = require('../error/errors')
const { invalidTokenError } = require('../error/errors')

const authMiddleware = (req, res, next) => {
  try {
    const token = req.header('token')
    if (!token) {
      next(missingTokenError())
    }
    const verified = jwt.verify(token, process.env.TOKEN_SECRET)
    const { id } = verified
    req.user = id
    next()
  } catch (e) {
    next(invalidTokenError())
  }
}

module.exports = authMiddleware
