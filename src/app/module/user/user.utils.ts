import { Types } from 'mongoose'
import { AcademicSemesterModel } from '../academicSemester/academicSemester.model'
import { UserModel } from './user.model'

const findLastStudentId = async (year: string, semesterCode: string) => {
  const yearAndSemesterCode = year + semesterCode //'2030' + '01' = '203001'

  const lastStudent = await UserModel.findOne(
    {
      role: 'student',
      id: { $regex: yearAndSemesterCode },
    },
    { id: 1 },
  )
    .sort({
      createdAt: -1,
    })
    .lean()

  //2030010001
  return lastStudent?.id ? lastStudent.id : undefined
}

export const generatorStudentId = async (admissionSemester: Types.ObjectId) => {
  const semesterData = await AcademicSemesterModel.findOne({
    _id: admissionSemester,
  })

  if (semesterData === null) {
    throw new Error('Semester Data Invalid')
  }

  const currentSemesterCode = semesterData.code //2030
  const currentYear = semesterData.year //03

  const lastStudent = await findLastStudentId(currentYear, currentSemesterCode) //2030030001

  // const lastStudentSemesterCode = lastStudent?.substring(4, 6) //2030
  // const lastStudentYear = lastStudent?.substring(0, 4) //03

  //first time 0000
  let currentId = (0).toString().padStart(4, '0') //0000

  if (lastStudent) {
    currentId = lastStudent.substring(6) //0001
  }

  const increamentId = (Number(currentId) + 1).toString().padStart(4, '0') //0001+1

  //2030010001
  //2030 01 0001
  return semesterData.year + semesterData.code + increamentId
}
