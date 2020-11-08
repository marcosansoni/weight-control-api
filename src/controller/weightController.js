const moment = require('moment')
const errorResponse = require('../utils/errorResponse')
const Weight = require('../schema/Weight')
const successResponse = require('../utils/successResponse')
const weightValidation = require('../validation/weightValidation')
const fromMongoObjectToResult = require('../utils/fromMongoObjectToResult')

const createWeight = async (req, res) => {
  const { body } = req

  if (!Object.keys(body).length) {
    return errorResponse(res, 'Must provide a body')
  }

  // Validation of the input
  const { error } = weightValidation(body)
  if (error)
    return errorResponse(
      res,
      error.details.map((e) => e.message)
    )

  const { user } = req
  const { date: dateRequest } = body

  const date = moment.utc(dateRequest, 'DD/MM/YYYY')

  // const formattedDate = moment.utc(date, 'DD/MM/YYYY')
  // console.log(formattedDate)
  // console.log(formattedDate.isValid())
  if(!date.isValid())
    return errorResponse(res, 'Date must be into format DD/MM/YYYY')

  console.log(new Date(date.valueOf()))

  const dateObject = new Date(date.valueOf())

  console.log({
    ...body,
    date: dateObject,
    user: req.user
  })

  const weight = new Weight({
    ...body,
    date: dateObject,
    user: req.user
  })

  console.log(weight)
  //
  // console.log(user)
  //
  // Check if a weight is already registered for that date and user
  const weightExists = await Weight.findOne({ user, date: dateObject })
  console.log(weightExists)
  if (weightExists)
    return errorResponse(res, 'Weight is already associated for that day')
  //
  try {
    await weight.save()
    return successResponse(res, fromMongoObjectToResult(weight._doc))
  } catch (e) {
    errorResponse(res, 'Issue during creation of the weight')
  }
}

const updateWeight = async (req, res) => {
  const { body, user } = req
  if (!Object.keys(body).length)
    return errorResponse(res, 'Must provide a body')

  const { id } = req.params
  if (!id) return errorResponse(res, 'Must provide id of the weight')

  // Check if a weight is currently stored at the new date
  if (body.date) {
    const existsWeight = await Weight.findOne({ user, date: body.date })
    if (existsWeight)
      return errorResponse(res, 'A weight is already associated with this date')
  }

  // Get the current weight that we would like to edit
  const storedWeight = await Weight.findById(id)
  const updatedWeightBody = {
    weight: body.weight || storedWeight.weight,
    date: body.date || storedWeight.date,
  }

  console.log(storedWeight)

  if (storedWeight.user !== user)
    return errorResponse(res, 'weight Id not associated to the user')

  // Validation of the input
  const { error } = weightValidation(updatedWeightBody)

  if (error)
    return errorResponse(
      res,
      error.details.map((e) => e.message)
    )

  Weight.findByIdAndUpdate(id, body, (err, weight) => {
    if (err) return errorResponse(res, 'weight Id not found')

    successResponse(res, fromMongoObjectToResult(weight._doc))
  }).catch(() => errorResponse(res, 'Issue during updating of weight'))
}

const deleteWeight = async (req, res) => {
  const { id } = req.params
  if (!id) return errorResponse(res, 'Must provide id of the weight')

  const { user } = req

  await Weight.findOneAndDelete({ _id: id, user }, (err, weight) => {
    if (err) return errorResponse(res, 'Issue during deletion of weight')

    if (!weight) return errorResponse(res, 'Weight Id not found')

    successResponse(res)
  }).catch((err) => errorResponse(res, err))
}

const getAllFromUser = async (req, res) => {
  const { user } = req
  await Weight.find({ user }, (err, weight) => {
    if (err) return errorResponse(res, 'Issue during deletion of weight')
    if (!weight) return successResponse(res, { entities: [] })

    // console.log(toObject(weight))

    successResponse(res, { entities: fromMongoObjectToResult(weight) })
  }).catch((err) => errorResponse(res, err))
}

const deleteBulkyWeight = async (req, res) => {
  const { ids } = req.body
  if (!ids) return errorResponse(res, 'Must provide id of the weight')

  const { user } = req
  console.log(ids)

  await Weight.deleteMany({ user, _id: { $in: ids } }, (err, weight) => {
    if (err) return errorResponse(res, 'Issue during deletion of weight')
    if (!weight) return errorResponse(res, 'Weight Id not found')

    successResponse(res)
  }).catch((err) => errorResponse(res, err))
}

module.exports = {
  createWeight,
  updateWeight,
  deleteWeight,
  deleteBulkyWeight,
  getAllFromUser,
}
