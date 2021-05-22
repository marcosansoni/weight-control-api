const errorResponse = (res, errorInput, code) => {
  const errors = Array.isArray(errorInput) ? errorInput : [errorInput];
  return res.status(400).json({
    success: false,
    code: code || 400,
    errors,
  })
}

module.exports = errorResponse
