import config from '../../config'
import AppError from '../../errors/AppError'
import { TStudent } from '../student/student.interface'
import { StudentModel } from '../student/student.model'
import { TUser } from './user.interface'
// import { TNewUser } from './user.interface'
import { UserModel } from './user.model'
import { generatorStudentId } from './user.utils'

const createStudentIntoDB = async (password: string, studentData: TStudent) => {
  //check student email
  const isStudentEmailExists = await StudentModel.findOne({
    email: studentData.email,
  })

  if (isStudentEmailExists) {
    throw new AppError(500,'Email already exists!')
  }

  // if password dont comes from parameter then set default password
  // we dont need every feild of TUser type so we used Partial(ts utility) TUser
  const userData: Partial<TUser> = {
    password: password || (config.default_password as string),
    role: 'student',
    id: await generatorStudentId(studentData.academicSemester), // find academic semester info with admissionSemester refence
  }

  //create user
  const userResult = await UserModel.create(userData)

  if (userResult && userResult._id) {
    studentData.id = userResult.id
    studentData.user = userResult._id

    //create student
    const studentResult = await StudentModel.create(studentData)
    return studentResult
  }
}

// export
export const UserServices = {
  createStudentIntoDB,
}
