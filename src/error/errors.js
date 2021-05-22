const { ErrorType } = require('./constants')
const { ErrorDescription } = require('./constants')
const { ErrorCode } = require('./constants')

const errorResponse = (errors) => JSON.stringify({
  success: false,
  errors,
})

const errorsFactory = (errorType, fields = [], descriptions = []) => {
  if(fields.length === 0){
    return [{
      code: ErrorCode[errorType],
      description: ErrorDescription[errorType]
    }]
  }
  return fields.map((field, index) => ({
    code: ErrorCode[errorType],
    description: (descriptions.length >= index && descriptions[index]) || ErrorDescription[errorType],
    field,
  }))
}

const missingTokenError = () => new Error(errorResponse(errorsFactory(ErrorType.MISSING_TOKEN)));

const invalidTokenError = () => new Error(errorResponse(errorsFactory(ErrorType.INVALID_TOKEN)));

const malformedBodyError = () => new Error(errorResponse(errorsFactory(ErrorType.MALFORMED_BODY)));

const genericError = () => new Error(errorResponse(errorsFactory(ErrorType.GENERIC_ERROR)));

const missingBodyError = () => new Error(errorResponse(errorsFactory(ErrorType.MISSING_BODY)));

const notFoundError = () => new Error(errorResponse(errorsFactory(ErrorType.NOT_FOUND)));

const incongruentTypeParamsError = (fields) => new Error(errorResponse(errorsFactory(ErrorType.INCONGRUENT_TYPE_PARAMS, fields)));

const missingParamsError = (fields) => new Error(errorResponse(errorsFactory(ErrorType.MISSING_PARAMS, fields)));
const missingParamsCustomDescriptionError = (fields, description) => new Error(errorResponse(errorsFactory(ErrorType.MISSING_PARAMS, fields, description)));

const invalidParamsError = (fields) => new Error(errorResponse(errorsFactory(ErrorType.INVALID_PARAMS, fields)));
const invalidParamsCustomDescriptionError = (fields, description) => new Error(errorResponse(errorsFactory(ErrorType.INVALID_PARAMS, fields, description)));

module.exports = {
  missingTokenError,
  invalidTokenError,
  malformedBodyError,
  genericError,
  notFoundError,
  missingBodyError,
  incongruentTypeParamsError,
  invalidParamsError,
  missingParamsError,
  missingParamsCustomDescriptionError,
  invalidParamsCustomDescriptionError,
}
