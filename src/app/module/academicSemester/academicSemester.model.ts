import { model, Schema } from 'mongoose'
import {
  TAcademicSemester,
  TAcademicSemesterCode,
  TAcademicSemesterMonth,
  TAcademicSemesterName,
} from './academicSemester.interface'

export const academicSemesterMonthArray: TAcademicSemesterMonth[] = [
  'january',
  'february',
  'march',
  'april',
  'may',
  'june',
  'july',
  'august',
  'september',
  'october',
  'november',
  'december',
]

export const academicSemesterNameArray: TAcademicSemesterName[] = [
  'summer',
  'spring',
  'fall',
]

export const academicSemesterCodeArray: TAcademicSemesterCode[] = [
  '01',
  '02',
  '03',
]

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
