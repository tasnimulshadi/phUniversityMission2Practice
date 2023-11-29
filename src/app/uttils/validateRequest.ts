import { NextFunction, Request, Response } from 'express'
import { AnyZodObject } from 'zod'

//validation
//getting zod schema as parameter
//and parsing req body data with the schema asynchronously
const validateRequest = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({ body: req.body })
      next()
    } catch (err) {
      next(err)
    }
  }
}

export default validateRequest
