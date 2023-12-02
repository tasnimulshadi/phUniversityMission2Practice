import { TAcademicFaculty } from './academicFaculty.interface'
import { AcademicFacultyModel } from './academicFaculty.model'

//create
const createAcademicFacultyIntoDB = async (payload: TAcademicFaculty) => {
  const result = await AcademicFacultyModel.create(payload)
  return result
}

//get all
const getAllAcademicFacultyFromDB = async () => {
  const result = await AcademicFacultyModel.find({})
  return result
}

//get 1 by id
const getAcademicFacultyByIdFromDB = async (academicFacultyId: string) => {
  const result = await AcademicFacultyModel.findOne({
    _id: academicFacultyId,
  })

  return result
}

//update
const updateAcademicFacultyIntoDB = async (
  academicFacultyId: string,
  payload: TAcademicFaculty,
) => {
  const result = await AcademicFacultyModel.updateOne(
    { _id: academicFacultyId },
    { $set: payload },
  )

  return result
}


//export
export const academicFacultyServices = {
  createAcademicFacultyintoDB: createAcademicFacultyIntoDB,
  getAllAcademicFacultyFromDB,
  getAcademicFacultyByIdFromDB,
  updateAcademicFacultyintoDB: updateAcademicFacultyIntoDB,
}
