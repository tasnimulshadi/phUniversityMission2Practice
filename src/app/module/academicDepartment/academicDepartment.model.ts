import { Schema, model } from 'mongoose'
import { TAcademicDepartment } from './academicDepartment.interface'
import AppError from '../../errors/AppError'
import httpStatus from 'http-status'

const academicDepartmentschema = new Schema<TAcademicDepartment>(
  {
    name: {
      type: String,
      reqired: true,
      unique: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'AcademicFaculty',
    },
  },
  {
    timestamps: true,
  },
)

//document middleware
academicDepartmentschema.pre('save', async function (next) {
  //check if the name is already exists
  const isDeparmentExists = await AcademicDepartmentModel.findOne({
    name: this.name,
  })

  if (isDeparmentExists) {
    throw new AppError(404, 'Department Aleardy exists!')  
  }

  next()
})

//query middleware
academicDepartmentschema.pre('updateOne', async function (next) {
  const query = this.getQuery()

  const isDeparmentExists = await AcademicDepartmentModel.findOne({
    _id: query._id,
  })

  if (!isDeparmentExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Department Dont exists!')
  }

  next()
})

//export
export const AcademicDepartmentModel = model<TAcademicDepartment>(
  'AcademicDepartment',
  academicDepartmentschema,
)
