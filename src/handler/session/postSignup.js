const pino = require('express-pino-logger')()
const userValidation = require('../../validation/userValidation')
const User = require('../../schema/User')
const successResponse = require('../../utils/successResponse')
const { genericError } = require('../../error/errors')
const { invalidParamsCustomDescriptionError, invalidParamsError } = require('../../error/errors')
const { hashValue } = require('../../utils/hashing/hashValue')

const postSignup = async (req, res, next) => {
  try {
    const { body } = req
    // Validation of the input
    const { error } = userValidation(body)
    if (error) {
      pino.logger.info(error)
      return next(invalidParamsCustomDescriptionError(
        error.details.map(e => e.path).flat(),
        error.details.map(e => e.message),
      ))
    }

    const { email, password } = body
    const user = new User({ ...body, password: await hashValue(password) })

    // Check if user is already registered
    const emailExists = await User.findOne({ email })
    if (emailExists) {
      return next(invalidParamsError(error.details.map(e => e.path).flat()))
    }

    const savedUser = await user.save()
    return successResponse(res, { user: savedUser._id })
  } catch (e) {
    pino.logger.error(e)
    next(genericError())
  }
}

module.exports = postSignup
