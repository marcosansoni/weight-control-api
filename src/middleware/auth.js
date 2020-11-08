const jwt = require('jsonwebtoken')
const errorResponse = require('../utils/errorResponse')

const auth = (req, res, next) => {
  const token = req.header('token')
  if (!token) return errorResponse(res, 'Access denied')

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET)
    const { id } = verified
    req.user = id
    next()

  } catch (e) {
    return errorResponse(res, 'Token seems corrupted')
  }
}

module.exports = auth
