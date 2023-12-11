/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler } from 'express'
import { ZodError } from 'zod'
import { TErrorSources } from '../interface/error'
import config from '../config'
import handleZodError from '../errors/handleZodError'
import handleValidationError from '../errors/handleValidationError'
import handleDuplicateError from '../errors/handleDuplicateError'
import AppError from '../errors/AppError'

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  //setting default values
  let statusCode = err.statusCode || 500
  let message = err.message || 'Something went Wrong!'
  let errorSources: TErrorSources = [
    {
      path: '',
      message: 'Something went wrong!',
    },
  ]

  if (err instanceof ZodError) {
    // zod
    const simplifiedError = handleZodError(err)

    statusCode = simplifiedError?.statusCode
    message = simplifiedError?.message
    errorSources = simplifiedError?.errorSources
  } else if (err?.name === 'ValidationError') {
    // mongoose validation
    const simplifiedError = handleValidationError(err)

    statusCode = simplifiedError?.statusCode
    message = simplifiedError?.message
    errorSources = simplifiedError?.errorSources
  } else if (err?.name === 'CastError') {
    // mongoose cast error
    const simplifiedError = handleValidationError(err)

    statusCode = simplifiedError?.statusCode
    message = simplifiedError?.message
    errorSources = simplifiedError?.errorSources
  } else if (err?.code === 11000) {
    // duplicate
    const simplifiedError = handleDuplicateError(err)

    statusCode = simplifiedError?.statusCode
    message = simplifiedError?.message
    errorSources = simplifiedError?.errorSources
  } else if (err instanceof AppError) {
    // my AppError
    const simplifiedError = handleDuplicateError(err)

    statusCode = err.statusCode
    message = err.message
    errorSources = [
      {
        path: '',
        message: err.message,
      },
    ]
  } else if (err instanceof Error) {
    // Error
    const simplifiedError = handleDuplicateError(err)

    message = err.message
    errorSources = [
      {
        path: '',
        message: err.message,
      },
    ]
  }

  //
  //
  // ultimate response
  return res.status(statusCode).json({
    success: false,
    message,
    errorSources: errorSources,
    stack: config.node_env === 'development' ? err?.stack : null,
    err,
  })
}

export default globalErrorHandler
