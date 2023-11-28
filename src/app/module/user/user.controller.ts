import { NextFunction, Request, Response } from 'express'
import { UserServices } from './user.service'

const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { password, studentData } = req.body
    const result = await UserServices.createStudentIntoDB(password, studentData)

    res.status(200).json({
      success: true,
      message: 'success',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

// export
export const UserControllers = {
  createStudent,
}
