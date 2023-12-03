import { model, Schema } from 'mongoose'
import { TAcademicSemester } from './academicSemester.interface'
import {
  academicSemesterCodeArray,
  academicSemesterMonthArray,
  academicSemesterNameArray,
} from './academicSemester.constant'
import AppError from '../../errors/AppError'

//
//
// schema
const academicSemesterSchema = new Schema<TAcademicSemester>(
  {
    name: {
      type: String,
      required: true,
      enum: academicSemesterNameArray,
    },
    year: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
      enum: academicSemesterCodeArray,
    },
    startMonth: {
      type: String,
      required: true,
      enum: academicSemesterMonthArray,
    },
    endMonth: {
      type: String,
      required: true,
      enum: academicSemesterMonthArray,
    },
  },
  {
    timestamps: true,
  },
)

//
//
// document middleware
academicSemesterSchema.pre('save', async function (next) {
  // get the document before save into db
  // find if the fields exist in db
  const isSemesterExists = await AcademicSemesterModel.findOne({
    name: this.name,
    year: this.year,
  })
  //if found throw error
  if (isSemesterExists) {
    throw new AppError(403, 'Academic Semester Already exists!')
  }

  next()
})

// academicSemesterSchema.pre('updateOne', async function (next) {
//   //check the db for existing data which matches the provided data
//   // except current _id
//   const isSemesterExists = await AcademicSemesterModel.findOne({
//     _id: { $ne: this._conditions._id },
//     name: this._update.$set.name,
//     year: this._update.$set.year,
//   })

//   if (isSemesterExists) {
// throw new AppError(403,'Can not Update to and existing Academic Semester')
//   }

//   next()
// })

//
//
// export
export const AcademicSemesterModel = model<TAcademicSemester>(
  'AcademicSemester',
  academicSemesterSchema,
)
