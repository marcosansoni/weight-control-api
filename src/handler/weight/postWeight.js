const pino = require('express-pino-logger')()
const weightValidation = require('../../validation/weightValidation')
const Weight = require('../../schema/Weight')
const successResponse = require('../../utils/successResponse')
const fromMongoObjectToResult = require('../../utils/fromMongoObjectToResult')
const { invalidParamsCustomDescriptionError, genericError } = require('../../error/errors')
const { dateValidation, MongooseFormatDate } = require('../../utils/dateValidation')

// eslint-disable-next-line consistent-return
const postWeight = async (req, res, next) => {
  try {
    const { body } = req

    // Validation of the input
    const { error } = weightValidation(body)
    if (error) {
      pino.logger.info(error)
      return next(invalidParamsCustomDescriptionError(
        error.details.map(e => e.path).flat(),
        error.details.map(e => e.message),
      ))
    }

    const { user } = req

    if (!dateValidation(body.date)) {
      return next(invalidParamsCustomDescriptionError(
        ['date'],
        [`Invalid format on date params, date must be on format ${MongooseFormatDate}`],
      ))
    }

    const dateObject = new Date(body.date.valueOf())

    const weight = new Weight({
      ...body,
      date: dateObject,
      user: req.user,
    })

    // Check if a weight is already registered for that date and user
    const weightExists = await Weight.findOne({ user, date: dateObject })
    if (weightExists) {
      return next(invalidParamsCustomDescriptionError(
        ['date'],
        [`Weight is already associated for that day`],
      ))
    }

    await weight.save()
    return successResponse(res, fromMongoObjectToResult(weight._doc))

  } catch (e) {
    pino.logger.error(e)
    next(genericError())
  }


}

module.exports = postWeight
