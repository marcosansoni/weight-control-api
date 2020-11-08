const errorResponse = require('../utils/errorResponse')
const Food = require('../schema/Food')
const successResponse = require('../utils/successResponse')
const foodValidation = require('../validation/foodValidation')
const fromMongoObjectToResult = require('../utils/fromMongoObjectToResult')

const createFood = async (req, res) => {
  const { body } = req

  if (!Object.keys(body).length) {
    return errorResponse(res, 'Must provide a body')
  }

  // Validation of the input
  const { error } = foodValidation(body)
  if (error)
    return errorResponse(
      res,
      error.details.map((e) => e.message)
    )

  const food = new Food({ ...body })
  //
  // Check if a weight is already registered for that date and user
  const foodExists = await Food.findOne({ name: body.name })
  if (foodExists)
    return errorResponse(res, 'Food with this name already exists')
  //
  try {
    await food.save()
    return successResponse(res, fromMongoObjectToResult(food._doc))
  } catch (e) {
    errorResponse(res, 'Issue during creation of the food')
  }
}

const associateFoodWithExternalApi = async (req, res) => {
  const { id } = req.params
  const { body } = req
  if (!Object.keys(body).length)
    return errorResponse(res, 'Must provide a body')

  const { externalApiId } = body

  if (!externalApiId) return errorResponse(res, 'Must provide externalApiId to match')

  Food.findByIdAndUpdate(id, { externalApiId }, (err, food) => {
    if (err) return errorResponse(res, 'Food Id not found')

    successResponse(res, fromMongoObjectToResult(food._doc))
  }).catch(() => errorResponse(res, 'Issue during association of the food'))
}

const getFood = async (req, res) => {
  await Food.find({}, (err, food) => {
    if (err) return errorResponse(res, 'Issue while getting data from database')
    if (!food) return successResponse(res, { entities: [] })

    successResponse(res, { entities: fromMongoObjectToResult(food) })
  }).catch((err) => errorResponse(res, err))
}


module.exports = {
  createFood,
  associateFoodWithExternalApi,
  getFood,
}
