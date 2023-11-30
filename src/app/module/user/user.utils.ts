import { Types } from 'mongoose'
import { AcademicSemesterModel } from '../academicSemester/academicSemester.model'
import { UserModel } from './user.model'

const findLastStudentId = async () => {
  const lastStudent = await UserModel.findOne({ role: 'student' }, { id: 1 })
    .sort({
      createdAt: -1,
    })
    .lean()

  //2030010001
  //------0001
  return lastStudent?.id ? lastStudent.id.substring(6) : undefined
}

export const generatorStudentId = async (admissionSemester: Types.ObjectId) => {
  const semesterData = await AcademicSemesterModel.findOne({
    _id: admissionSemester,
  })

  if (semesterData === null) {
    throw new Error('Semester Data Invalid')
  }

  //first time 0000 (0).toString()
  const currentId = (await findLastStudentId()) || (0).toString()
  console.log(currentId)

  const increamentId = (Number(currentId) + 1).toString().padStart(4, '0')
  console.log(increamentId)

  //2030010001
  //2030 01 0001
  return semesterData.year + semesterData.code + increamentId
}
