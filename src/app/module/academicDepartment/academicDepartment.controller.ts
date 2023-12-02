import catchAsync from '../../uttils/catchAsync'
import { AcademicDepartmentServices } from './academicDepartment.service'

//create
const createAcademicDepartment = catchAsync(async (req, res) => {
  const data = req.body

  const result =
    await AcademicDepartmentServices.createAcademicDepartmentIntoDB(data)

  res.status(200).json({
    success: true,
    message: 'Academic Department created successfully',
    data: result,
  })
})

//get all
const getAllAcademicDepartment = catchAsync(async (req, res) => {
  const result =
    await AcademicDepartmentServices.getAllAcademicDepartmentFromDB()

  res.status(200).json({
    success: true,
    message: 'Academic Departments retrived successfully',
    data: result,
  })
})

//get 1
const getAcademicDepartmentById = catchAsync(async (req, res) => {
  const id = req.params.id
  const result =
    await AcademicDepartmentServices.getAcademicDepartmentByIdFromDB(id)

  res.status(200).json({
    success: true,
    message: 'Academic Department retrived successfully',
    data: result,
  })
})

//update
const updateAcademicDeparment = catchAsync(async (req, res) => {
  const data = req.body
  const id = req.params.id

  const result = await AcademicDepartmentServices.updateAcademicDeparmentIntoDB(
    id,
    data,
  )

  res.status(200).json({
    success: true,
    message: 'Academic Department updated successfully',
    data: result,
  })
})

//export
export const AcademicDepartmentControllers = {
  createAcademicDepartment,
  getAllAcademicDepartment,
  getAcademicDepartmentById,
  updateAcademicDeparment,
}
