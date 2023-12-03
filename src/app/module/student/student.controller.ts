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

export const StudentControllers = {
  getAllStudents,
}
