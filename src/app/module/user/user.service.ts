import config from '../../config'
import { TStudent } from '../student/student.interface'
import { StudentModel } from '../student/student.model'
import { TUser } from './user.interface'
// import { TNewUser } from './user.interface'
import { UserModel } from './user.model'

const createStudentIntoDB = async (password: string, studentData: TStudent) => {
  //is user exists

  // if password dont comes from parameter then set default password
  // TNewUser is bangla system so we used Partial(ts utility) TUser
  const userData: Partial<TUser> = {
    password: password || (config.default_password as string),
    role: 'student',
    id: '2030100001',
  }

  const userResult = await UserModel.create(userData)

  if (userResult && userResult._id) {
    studentData.id = userResult.id
    studentData.user = userResult._id

    const studentResult = await StudentModel.create(studentData)
    return studentResult
  }
}

// export
export const UserServices = {
  createStudentIntoDB,
}
