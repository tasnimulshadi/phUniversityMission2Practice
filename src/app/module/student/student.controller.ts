import catchAsync from '../../uttils/catchAsync'
import { StudentServices } from './student.service'

//get all
const getAllStudents = catchAsync(async (req, res) => {
  const result = await StudentServices.getAllStudentsFromDB()

  res.status(200).json({
    success: true,
    message: 'Students data retrived Successfully',
    data: result,
  })
})

//get 1
const getStudentById = catchAsync(async (req, res) => {
  const studentId = req.params.studentId

  const result = await StudentServices.getStudentByIdFromDB(studentId)

  res.status(200).json({
    success: true,
    message: 'Students data retrived Successfully',
    data: result,
  })
})

export const StudentControllers = {
  getAllStudents,
  getStudentById,
}
