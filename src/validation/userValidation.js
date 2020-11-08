const Joi = require('joi')

const userValidation = (user) => {
  const validationSchema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
    firstName: Joi.string().min(6),
    lastName: Joi.string().min(6),
    lastLogin: Joi.date(),
  })

  return validationSchema.validate(user)
}

module.exports = userValidation
