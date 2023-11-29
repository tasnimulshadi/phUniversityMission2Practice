import { UserServices } from './user.service'
import catchAsync from '../../uttils/catchAsync'

// catchAsync is higher order function 
// which takes a requesthandler async function and resolve it. 
// if it got any error then send to global error handler
// returns the combined function
const createStudent = catchAsync(async (req, res) => {
  const { password, studentData } = req.body
  const result = await UserServices.createStudentIntoDB(password, studentData)

  res.status(200).json({
    success: true,
    message: 'success',
    data: result,
  })
})

// export
export const UserControllers = {
  createStudent,
}
