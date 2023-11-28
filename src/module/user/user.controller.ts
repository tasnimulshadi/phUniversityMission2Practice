import { Request, Response } from 'express'
import { UserServices } from './user.service'

const createStudent = async (req: Request, res: Response) => {
  try {
    const { password, studentData } = req.body
    const result = await UserServices.createStudentIntoDB(password, studentData)

    res.status(200).json({
      success: true,
      message: 'success',
      data: result,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'failed',
      error: error,
    })
  }
}

// export
export const UserControllers = {
  createStudent,
}
