import { academicSemesterNameCodeMapper } from './academicSemester.constant'
import { TAcademicSemester } from './academicSemester.interface'
import { AcademicSemesterModel } from './academicSemester.model'

//post
const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
  //prevent name and code difference
  //make a wrapper then compare data with mapper
  // if does not match returns error
  if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
    throw new Error('invalid code... code does not match name')
  }

  const result = await AcademicSemesterModel.create(payload)
  return result
}

//get all
const getAllAcademicSemestersFromDB = async () => {
  const result = await AcademicSemesterModel.find({})
  return result
}

//get 1 by id
const getAcademicSemesterByIdFromDB = async (semesterId: string) => {
  const result = await AcademicSemesterModel.findOne({
    _id: semesterId,
  })
  return result
}

//update 1 by id
const updateAcademicSemesterByIdIntoDB = async (
  semesterId: string,
  payload: TAcademicSemester,
) => {
  // check for existing semester with same mane and year
  const isSemesterExists = await AcademicSemesterModel.findOne({
    _id: { $ne: semesterId },
    name: payload.name,
    year: payload.year,
  })

  if (isSemesterExists) {
    throw new Error('Can not Update to and existing Academic Semester')
  }

  // check for if code does not match name
  if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
    throw new Error('invalid code... code does not match name')
  }

  const result = await AcademicSemesterModel.updateOne(
    { _id: semesterId },
    { $set: payload },
  )

  return result
}

//
//
//export
export const AcademicSemesterServices = {
  createAcademicSemesterIntoDB,
  getAllAcademicSemestersFromDB,
  getAcademicSemesterByIdFromDB,
  updateAcademicSemesterByIdIntoDB,
}
