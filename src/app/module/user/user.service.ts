import mongoose from 'mongoose'
import config from '../../config'
import AppError from '../../errors/AppError'
import { TStudent } from '../student/student.interface'
import { StudentModel } from '../student/student.model'
import { TUser } from './user.interface'
// import { TNewUser } from './user.interface'
import { UserModel } from './user.model'
import { generatorStudentId } from './user.utils'
import httpStatus from 'http-status'

const createStudentIntoDB = async (password: string, studentData: TStudent) => {
  //check student email
  const isStudentEmailExists = await StudentModel.findOne({
    email: studentData.email,
  })

  if (isStudentEmailExists) {
    throw new AppError(403, 'Email already exists!')
  }

  //session create
  const session = await mongoose.startSession()

  try {
    // start session transaction
    session.startTransaction()

    // if password dont comes from parameter then set default password
    // we dont need every feild of TUser type so we used Partial(ts utility) TUser
    const userData: Partial<TUser> = {
      password: password || (config.default_password as string),
      role: 'student',
      id: await generatorStudentId(studentData.academicSemester), // find academic semester info with admissionSemester refence
    }

    //create user (transaction-1)
    const userResult = await UserModel.create([userData], { session }) //resilts is in array

    //transaction-1 error
    if (!userResult.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create User')
    }

    studentData.id = userResult[0].id
    studentData.user = userResult[0]._id

    //create student (transaction-2)
    const studentResult = await StudentModel.create([studentData], { session })

    //transaction-2 error
    if (!studentResult.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create Student')
    }

    // session success
    // commit transaction
    await session.commitTransaction()
    // end session
    await session.endSession()

    return studentResult[0]
  } catch (error) {
    // session failed
    // abort transaction
    await session.abortTransaction()
    // end session
    await session.endSession()

    throw new AppError(httpStatus.UNPROCESSABLE_ENTITY, 'Failed to Create')
  }
}

// export
export const UserServices = {
  createStudentIntoDB,
}
