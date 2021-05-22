const pino = require('express-pino-logger')()

const errorHandler = (err, req, res, next) => {
  const response = JSON.parse(err.message)
  pino.logger.info(response)
  return res.status(400).json(response)
}

module.exports = errorHandler
