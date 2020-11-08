const Joi = require('joi')

const foodValidation = (input) => {
  const validationSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().min(6),
    externalApiId: Joi.string(),
  })

  return validationSchema.validate(input)
}

module.exports = foodValidation
