const ErrorType = {
  MISSING_TOKEN: 'MISSING_TOKEN',
  INVALID_TOKEN: 'INVALID_TOKEN',
  GENERIC_ERROR: 'GENERIC_ERROR',
  MALFORMED_BODY: 'MALFORMED_BODY',
  MISSING_BODY: 'MISSING_BODY',
  INCONGRUENT_TYPE_PARAMS: 'INCONGRUENT_TYPE_PARAMS',
  MISSING_PARAMS: 'MISSING_PARAMS',
  NOT_FOUND: 'NOT_FOUND',
  INVALID_PARAMS: 'INVALID_PARAMS',
}

const ErrorCode = {
  [ErrorType.MISSING_TOKEN]: 2201,
  [ErrorType.INVALID_TOKEN]: 2202,
  [ErrorType.GENERIC_ERROR]: 500,
  [ErrorType.MALFORMED_BODY]: 2301,
  [ErrorType.MISSING_BODY]: 2302,
  [ErrorType.INCONGRUENT_TYPE_PARAMS]: 2303,
  [ErrorType.MISSING_PARAMS]: 2304,
  [ErrorType.INVALID_PARAMS]: 2305,
  [ErrorType.NOT_FOUND]: 404,
}

const ErrorDescription = {
  [ErrorType.MISSING_TOKEN]: 'Header token is missing',
  [ErrorType.INVALID_TOKEN]: 'Header token is invalid',
  [ErrorType.GENERIC_ERROR]: 'Internal server error',
  [ErrorType.MALFORMED_BODY]: 'Body is not a valid JSON',
  [ErrorType.MISSING_BODY]: 'Body is required',
  [ErrorType.INCONGRUENT_TYPE_PARAMS]: 'Invalid type for parameter',
  [ErrorType.MISSING_PARAMS]: 'Parameter is missing',
  [ErrorType.INVALID_PARAMS]: 'Parameter is invalid',
  [ErrorType.NOT_FOUND]: 'Not found',
}

module.exports = {
  ErrorType,
  ErrorCode,
  ErrorDescription,
}
