import mongoose from 'mongoose'
import { StudentModel } from './student.model'
import { UserModel } from '../user/user.model'
import AppError from '../../errors/AppError'
import httpStatus from 'http-status'
import { TStudent } from './student.interface'

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

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'User Does not exists in DB')
  }

  return result
}

//delete (update { isDeleted: true })
const deleteStudentFromDB = async (studentId: string) => {
  //is user exists
  const isUserExists = await StudentModel.findOne({ id: studentId })

  if (!isUserExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'User Does not exists in DB')
  }

  //create session
  const session = await mongoose.startSession()

  try {
    session.startTransaction()

    //transaction 1
    const deletedUser = await UserModel.findOneAndUpdate(
      { id: studentId },
      { isDeleted: true },
      { new: true, session },
    )

    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete User')
    }

    //transaction 2
    const deletedStudent = await StudentModel.findOneAndUpdate(
      { id: studentId },
      { isDeleted: true },
      { new: true, session },
    )

    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create Student')
    }

    //session success
    await session.commitTransaction()
    await session.endSession()

    return deletedStudent
  } catch (error) {
    //session failed
    await session.abortTransaction()
    await session.endSession()

    throw new AppError(httpStatus.UNPROCESSABLE_ENTITY, 'Failed to Delete')
  }
}

const updateStudentFromDB = async (
  studentId: string,
  payload: Partial<TStudent>,
) => {
  //is user exists
  const isUserExists = await StudentModel.findOne({ id: studentId })
  if (!isUserExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'User Does not exists in DB')
  }

  //deconstructing noniprimitive data
  const { name, guadian, localGuadian, ...remainingStudentData } = payload

  //object with the rest data
  //Record<string, unknown> is object type
  const modifiedUpdateData: Record<string, unknown> = {
    ...remainingStudentData,
  }

  //checking if the update Document has ny non-primitive data. if has then do this
  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdateData[`name.${key}`] = value
    }
  }
  if (guadian && Object.keys(guadian).length) {
    for (const [key, value] of Object.entries(guadian)) {
      modifiedUpdateData[`guadian.${key}`] = value
    }
  }
  if (localGuadian && Object.keys(localGuadian).length) {
    for (const [key, value] of Object.entries(localGuadian)) {
      modifiedUpdateData[`localGuadian.${key}`] = value
    }
  }

  const result = await StudentModel.findOneAndUpdate(
    { id: studentId },
    modifiedUpdateData,
    { new: true, runValidators: true },
  )

  return result
}

//export
export const StudentServices = {
  getAllStudentsFromDB,
  getStudentByIdFromDB,
  deleteStudentFromDB,
  updateStudentFromDB,
}
