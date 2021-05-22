const pino = require('express-pino-logger')()

const successResponse = (res, result = {}) => {
  const response = {
    success: true,
    ...(Object.keys(result).length && { result }),
  };
  pino.logger.info(response)
  return res.send(response)
}

module.exports = successResponse
