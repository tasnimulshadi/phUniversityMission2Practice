import { TAcademicDepartment } from './academicDepartment.interface'
import { AcademicDepartmentModel } from './academicDepartment.model'

//create
const createAcademicDepartmentIntoDB = async (payload: TAcademicDepartment) => {
  const result = await AcademicDepartmentModel.create(payload)
  return result
}

//get all
const getAllAcademicDepartmentFromDB = async () => {
  const result = await AcademicDepartmentModel.find({})
  return result
}

//get 1
const getAcademicDepartmentByIdFromDB = async (id: string) => {
  const result = await AcademicDepartmentModel.findOne({ _id: id })
  return result
}

// update
const updateAcademicDeparmentIntoDB = async (
  id: string,
  payload: TAcademicDepartment,
) => {
  const result = await AcademicDepartmentModel.updateOne(
    { _id: id },
    { $set: payload },
  )

  return result
}

export const AcademicDepartmentServices = {
  createAcademicDepartmentIntoDB,
  getAllAcademicDepartmentFromDB,
  getAcademicDepartmentByIdFromDB,
  updateAcademicDeparmentIntoDB,
}
