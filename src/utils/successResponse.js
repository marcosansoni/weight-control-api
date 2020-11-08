const successResponse = (res, result = {}) => {
  return res.send({
    success: true,
    ...(Object.keys(result).length && { result }),
  })
}

module.exports = successResponse
