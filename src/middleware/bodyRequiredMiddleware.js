const { missingBodyError } = require('../error/errors')

// eslint-disable-next-line consistent-return
const bodyRequiredMiddleware = (req, res, next) => {
  const { body } = req
  if (!body || !Object.keys(body).length) {
    next(missingBodyError())
  }
  next()
}

module.exports = bodyRequiredMiddleware
