const jwt = require('jsonwebtoken')
const pino = require('express-pino-logger')()
const loginValidation = require('../../validation/loginValidation')
const User = require('../../schema/User')
const successResponse = require('../../utils/successResponse')
const { genericError, notFoundError, invalidParamsCustomDescriptionError } = require('../../error/errors')
const { TokenSecret } = require('../../environment/envManager')
const { checkHashedValue } = require('../../utils/hashing/hashValue')

// eslint-disable-next-line consistent-return
const postLogin = async (req, res, next) => {
  try {
    const { body } = req
    // Validate input
    const { error } = loginValidation(body)
    if (error) {
      pino.logger.info(error)
      return next(invalidParamsCustomDescriptionError(
        error.details.map(e => e.path).flat(),
        error.details.map(e => e.message)
      ))
    }

    // Check if user is stored into database
    const { email } = body
    const user = await User.findOne({ email })
    if (!user) {
      return next(notFoundError())
    }

    // Check if password match
    const validPass = await checkHashedValue(body.password, user.password)
    if (!validPass) {
      return next(notFoundError())
    }

    const token = jwt.sign({ id: user._id }, TokenSecret)
    res.header('token', token)
    return successResponse(res, { token })
  } catch (e) {
    pino.logger.error(e)
    next(genericError())
  }

}

module.exports = postLogin
