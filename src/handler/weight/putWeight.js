const pino = require('express-pino-logger')()
const weightValidation = require('../../validation/weightValidation')
const Weight = require('../../schema/Weight')
const successResponse = require('../../utils/successResponse')
const fromMongoObjectToResult = require('../../utils/fromMongoObjectToResult')
const { notFoundError } = require('../../error/errors')
const { toMongooseDate } = require('../../utils/dateValidation')
const { missingParamsError } = require('../../error/errors')
const { invalidParamsCustomDescriptionError, genericError } = require('../../error/errors')
const { dateValidation, MongooseFormatDate } = require('../../utils/dateValidation')

// eslint-disable-next-line consistent-return
const putWeight = async (req, res, next) => {
  try {
    const { id } = req.params
    if (!id) {
      return next(missingParamsError(['id']))
    }

    const { user } = req
    const { date } = req.body

    // Check if a weight is currently stored at the new date
    if (date) {
      if (!dateValidation(date)) {
        return next(invalidParamsCustomDescriptionError(
          ['date'],
          [`Invalid format on date params, date must be on format ${MongooseFormatDate}`],
        ))
      }
      const existsWeight = await Weight.findOne({ user, date: toMongooseDate(date) })
      if (existsWeight) {
        return next(invalidParamsCustomDescriptionError(
          ['date'],
          [`A weight is already associated for that date`],
        ))
      }
    }

    // Get the current weight that we would like to edit
    const { user: storedUser } = await Weight.findById(id) || {}

    if (storedUser !== user) {
      return next(notFoundError())
    }

    await Weight.findByIdAndUpdate(id, req.body,
      (err, w) => {
        if (err) {
          pino.logger.error(err)
          next(genericError())
        }
        if (!w) return successResponse(res, { entities: [] })
        return successResponse(res,
          { entities: [fromMongoObjectToResult(w._doc)] },
        )
      })
  } catch (e) {
    pino.logger.error(e)
    next(genericError())
  }


}

module.exports = putWeight
