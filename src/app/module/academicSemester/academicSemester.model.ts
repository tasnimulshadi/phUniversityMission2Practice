import { model, Schema } from 'mongoose'
import { TAcademicSemester } from './academicSemester.interface'
import {
  academicSemesterCodeArray,
  academicSemesterMonthArray,
  academicSemesterNameArray,
} from './academicSemester.constant'

const academicSemesterSchema = new Schema<TAcademicSemester>(
  {
    name: {
      type: String,
      required: true,
      enum: academicSemesterNameArray,
    },
    year: {
      type: Date,
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

export const AcademicSemesterModel = model<TAcademicSemester>(
  'AcademicSemester',
  academicSemesterSchema,
)
