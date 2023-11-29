import { NextFunction, Request, RequestHandler, Response } from 'express'

// Higher Order Function
// catchAsync gets a function as a parameter
// it recives a asynchronous function
// asynchronous function returns a Promise
// RequestHandler is a function type

const catchAsync = (fn: RequestHandler) => {
  //return as a function
  return (req: Request, res: Response, next: NextFunction) => {
    //added catch with existing function
    Promise.resolve(fn(req, res, next)).catch((error) => next(error))
  }
}

// export
export default catchAsync
