const pino = require('express-pino-logger')()
const Weight = require('../../schema/Weight')
const successResponse = require('../../utils/successResponse')
const { missingParamsError, genericError, notFoundError } = require('../../error/errors')

// eslint-disable-next-line consistent-return
const deleteWeight = async (req, res, next) => {
  try {
    const { id } = req.params
    if (!id) {
      return next(missingParamsError(['id']))
    }

    const { user } = req

    await Weight.findOneAndDelete({ _id: id, user }, (err, weight) => {
      if (err) {
        pino.logger.error(err)
        return next(genericError())
      }
      if (!weight) {
        return next(notFoundError())
      }
      return successResponse(res)
    })
  } catch (e) {
    pino.logger.error(e)
    next(genericError())
  }
}

module.exports = deleteWeight
