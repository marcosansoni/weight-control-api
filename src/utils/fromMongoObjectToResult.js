const replaceIntoObject = (obj) => {
  const { _id, __v, ...restObject } = obj

  return {
    ...restObject,
    id: _id,
  }
}

const fromMongoObjectToResult = (input) => {
  if (Array.isArray(input)) {
    return input.map((obj) => replaceIntoObject(obj._doc))
  }

  return replaceIntoObject(input)
}

module.exports = fromMongoObjectToResult
