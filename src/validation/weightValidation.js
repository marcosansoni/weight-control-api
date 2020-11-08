const Joi = require('joi')

const weightValidation = (input) => {
  const validationSchema = Joi.object({
    weight: Joi.string().required(),
    date: Joi.string().required(),
    note: Joi.string(),
  })

  return validationSchema.validate(input)
}

module.exports = weightValidation
