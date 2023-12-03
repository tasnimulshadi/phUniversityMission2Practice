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

//get 1
const getStudentByIdFromDB = async (studentId: string) => {
  const result = await StudentModel.findOne({ id: studentId })
    .populate({
      path: 'academicSemester',
    })
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
  getStudentByIdFromDB,
}
