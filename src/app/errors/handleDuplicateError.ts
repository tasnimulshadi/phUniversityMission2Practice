/* eslint-disable @typescript-eslint/no-explicit-any */
import { TErrorSources, TGenericErrorResponse } from '../interface/error'

const handleDuplicateError = (err: any): TGenericErrorResponse => {
  const errorSources: TErrorSources = [
    {
      path: Object.keys(err.keyValue)[0],
      message: 'Duplicate value exists',
    },
  ]

  return {
    statusCode: 400,
    message: 'Zod Validation Error',
    errorSources,
  }
}

export default handleDuplicateError
