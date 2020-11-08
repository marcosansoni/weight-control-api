const bycript = require('bcryptjs')

const hashValue = async (value) => {
  const salt = await bycript.genSalt(10)
  return bycript.hash(value, salt)
}

const checkHashedValue = async (notHashedValue, hashedValue) => {
  return bycript.compare(notHashedValue, hashedValue)
}

module.exports = { hashValue, checkHashedValue }
