const jwt = require('jsonwebtoken')
const errorResponse = require('../utils/errorResponse')
const User = require('../schema/User')
const userValidation = require('../validation/userValidation')
const { hashValue, checkHashedValue } = require('../utils/hashing/hashValue')
const successResponse = require('../utils/successResponse')
const loginValidation = require('../validation/loginValidation')

const login = async (req, res) => {
  const { body } = req
  if (!body) {
    return errorResponse(res, 'Must provide a body')
  }
  // Validate input
  const { error } = loginValidation(body)
  if (error)
    return errorResponse(
      res,
      error.details.map((e) => e.message)
    )

  // Check if user is stored into database
  const { email } = body
  const user = await User.findOne({ email })
  if (!user) return errorResponse(res, 'Email not found')

  // Check if password match
  const validPass = await checkHashedValue(body.password, user.password)
  if (!validPass) return errorResponse(res, 'Invalid password')

  const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET)
  res.header('token', token)
  return successResponse(res, { token })
}

const signup = async (req, res) => {
  const { body } = req
  console.log(body)

  if (!Object.keys(body).length) {
    return errorResponse(res, 'Must provide a body')
  }

  // Validation of the input
  const { error } = userValidation(body)
  console.log(error)
  if (error)
    return errorResponse(
      res,
      error.details.map((e) => e.message)
    )

  const { email, password } = body
  const user = new User({ ...body, password: await hashValue(password) })

  console.log(user)

  // Check if user is already registered
  const emailExists = await User.findOne({ email })
  if (emailExists) return errorResponse(res, 'Email already exists')

  try {
    const savedUser = await user.save()
    return successResponse(res, { user: user._id })
  } catch (e) {
    console.log(e)
    errorResponse(res, JSON.stringify(e))
  }

  //     .then((savedUser) => successResponse(res, { user: savedUser._id }))
  //     // .catch((e) => errorResponse(res, 'Issue during creation of the user'))
  //     .catch((e) => errorResponse(res, JSON.stringify(e)))
}

module.exports = {
  login,
  signup,
}
