import { StudentModel } from './student.model'

//get all
const getAllStudentsFromDB = async () => {
  const result = await StudentModel.find()
    .populate('academicSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    })
  return result
}

//export
export const StudentServices = {
  getAllStudentsFromDB,
}
