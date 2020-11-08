const errorResponse = (res, errorInput) => {
  const errors = Array.isArray(errorInput) ? errorInput : [errorInput]
  return res.status(400).json({
    success: false,
    errors,
  })
}

module.exports = errorResponse
