const pino = require('express-pino-logger')()
const Joi = require('joi')
const Weight = require('../../schema/Weight')
const successResponse = require('../../utils/successResponse')
const { genericError, notFoundError, invalidParamsCustomDescriptionError } = require('../../error/errors')

const idsValidation = (body) => {
  const validationSchema = Joi.object({
    ids: Joi.array().required(),
  })

  return validationSchema.validate(body)
}


// eslint-disable-next-line consistent-return
const deleteBulkyWeight = async (req, res, next) => {
  try {
    const { body } = req
    // Validation of the input
    const { error } = idsValidation(body)
    if (error) {
      pino.logger.info(error)
      return next(invalidParamsCustomDescriptionError(
        error.details.map(e => e.path).flat(),
        error.details.map(e => e.message),
      ))
    }
    const { user } = req
    const { ids } = req.body
    await Weight.deleteMany({ user, _id: { $in: ids } }, (err, weight) => {
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

module.exports = deleteBulkyWeight
