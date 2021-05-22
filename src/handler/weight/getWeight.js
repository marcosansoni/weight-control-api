const pino = require('express-pino-logger')()
const successResponse = require('../../utils/successResponse')
const fromMongoObjectToResult = require('../../utils/fromMongoObjectToResult')
const Weight = require('../../schema/Weight')
const { invalidParamsCustomDescriptionError, genericError } = require('../../error/errors')
const { dateValidation, MongooseFormatDate } = require('../../utils/dateValidation')

// eslint-disable-next-line consistent-return
const getWeight = async (req, res, next) => {
  try {
    const { start, end } = req.query
    if (start && !dateValidation(start)) {
      return next(invalidParamsCustomDescriptionError(
        ['start'],
        [`Invalid format on start params, date must be on format ${MongooseFormatDate}`],
      ))
    }
    if (end && !dateValidation(end)) {
      return next(invalidParamsCustomDescriptionError(
        ['end'],
        [`Invalid format on end params, date must be on format ${MongooseFormatDate}`],
      ))
    }
    const date = { ...(start && { $gte: start }), ...(end && { $lte: end }) }
    const { user } = req
    await Weight.find({ user, ...(Object.keys(date).length && { date }) },
      (err, weight) => {
        if (err) {
          pino.logger.error(err)
          next(genericError())
        }
        if (!weight) return successResponse(res, { entities: [] })
        return successResponse(res,
          { entities: fromMongoObjectToResult(weight) },
        )
      })
  } catch (e) {
    pino.logger.error(e)
    next(genericError())
  }
}

module.exports = getWeight
