import catchAsync from '../../uttils/catchAsync'
import { AcademicSemesterServices } from './academicSemester.service'

//post
const createAcademicSemester = catchAsync(async (req, res) => {
  const data = req.body

  const result =
    await AcademicSemesterServices.createAcademicSemesterIntoDB(data)

  res.status(200).json({
    success: true,
    message: 'Academic semster is created succesfully',
    data: result,
  })
})

//get all
const getAllAcademicSemesters = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.getAllAcademicSemestersFromDB()

  res.status(200).json({
    success: true,
    message: 'Academic semesters found succesfully',
    data: result,
  })
})

// get 1 by id
const getAcademicSemesterById = catchAsync(async (req, res) => {
  const semesterId = req.params.semesterId

  const result =
    await AcademicSemesterServices.getAcademicSemesterByIdFromDB(semesterId)

  res.status(200).json({
    success: true,
    message: 'Academic semester found succesfully',
    data: result,
  })
})

////update 1 by id
const updateAcademicSemesterById = catchAsync(async (req, res) => {
  const semesterId = req.params.semesterId
  const data = req.body

  const result =
    await AcademicSemesterServices.updateAcademicSemesterByIdIntoDB(
      semesterId,
      data,
    )

  res.status(200).json({
    success: true,
    message: 'Academic semester updated succesfully',
    data: result,
  })
})

//
//
//export
export const AcademicSemesterControllers = {
  createAcademicSemester,
  getAllAcademicSemesters,
  getAcademicSemesterById,
  updateAcademicSemesterById,
}
