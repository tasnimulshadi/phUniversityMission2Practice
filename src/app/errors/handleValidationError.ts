import mongoose from 'mongoose'
import { TErrorSources, TGenericErrorResponse } from '../interface/error'

const handleValidationError = (
  err: mongoose.Error.ValidationError,
): TGenericErrorResponse => {
  const errorsValuesArray = Object.values(err.errors)
  const errorSources: TErrorSources = errorsValuesArray.map(
    (value: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: value?.path,
        message: value?.message,
      }
    },
  )

  return {
    statusCode: 400,
    message: 'Mongoose Validation Error',
    errorSources,
  }
}

export default handleValidationError
