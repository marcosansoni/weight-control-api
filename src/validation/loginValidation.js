const Joi = require('joi')

const loginValidation = (input) => {
  const validationSchema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  })

  return validationSchema.validate(input)
}

module.exports = loginValidation
