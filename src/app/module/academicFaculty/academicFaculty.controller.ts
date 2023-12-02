import catchAsync from '../../uttils/catchAsync'
import { academicFacultyServices } from './academicFaculty.service'

const createAcademicFaculty = catchAsync(async (req, res) => {
  const data = req.body

  const result = await academicFacultyServices.createAcademicFacultyintoDB(data)

  res.status(200).json({
    success: true,
    message: 'Academic faculty is created succesfully',
    data: result,
  })
})

const getAllAcademicFaculty = catchAsync(async (req, res) => {
  const result = await academicFacultyServices.getAllAcademicFacultyFromDB()

  res.status(200).json({
    success: true,
    message: 'Academic facultys are fetched succesfully',
    data: result,
  })
})

const getAcademicFacultyById = catchAsync(async (req, res) => {
  const academicFacultyId = req.params.academicFacultyId
  const result =
    await academicFacultyServices.getAcademicFacultyByIdFromDB(
      academicFacultyId,
    )

  res.status(200).json({
    success: true,
    message: 'Academic faculty is fetched succesfully',
    data: result,
  })
})

const updateAcademicFaculty = catchAsync(async (req, res) => {
  const data = req.body
  const academicFacultyId = req.params.academicFacultyId

  const result = await academicFacultyServices.updateAcademicFacultyintoDB(
    academicFacultyId,
    data,
  )

  res.status(200).json({
    success: true,
    message: 'Academic faculty is updated succesfully',
    data: result,
  })
})

export const AcademicFacultyControllers = {
  createAcademicFaculty,
  getAllAcademicFaculty,
  getAcademicFacultyById,
  updateAcademicFaculty,
}
