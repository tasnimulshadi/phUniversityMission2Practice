import mongoose from 'mongoose'
import { StudentModel } from './student.model'
import { UserModel } from '../user/user.model'
import AppError from '../../errors/AppError'
import httpStatus from 'http-status'
import { TStudent } from './student.interface'

//get all
const getAllStudentsFromDB = async (query: Record<string, unknown>) => {
  let searchTerm = ''
  if (query?.searchTerm) {
    searchTerm = query.searchTerm as string
  }

  const searchQuery = StudentModel.find({
    $or: ['email', 'name.firstName', 'presentAddress'].map((field) => ({
      [field]: { $regex: searchTerm, $options: 'i' },
    })),
  })

  const filterQueryObj = { ...query } //copy

  const excludeFieldsBeforeFilter = ['searchTerm', 'sort', 'limit', 'page']

  excludeFieldsBeforeFilter.forEach((elem) => delete filterQueryObj[elem])
  
  console.log({ query }, { filterQueryObj })

  const filterQuery = searchQuery
    .find(filterQueryObj)
    .populate('academicSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    })

  let sort = 'createdAt'
  if (query.sort) {
    sort = query.sort as string
  }

  const sortQuery = filterQuery.sort(sort)
  // console.log(sortQuery)

  let limit = 1
  let page = 1
  let skip = 0

  if (query.limit) {
    limit = Number(query.limit) //parse string to mun
  }

  if (query.page) {
    page = Number(query.page) //parse string to mun
    skip = (page - 1) * limit
  }

  const limitQuery = sortQuery.limit(limit)

  const paginationQuery = await limitQuery.skip(skip)

  return paginationQuery
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

  //checking if the update Document has any non-primitive data. if has then do this
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
