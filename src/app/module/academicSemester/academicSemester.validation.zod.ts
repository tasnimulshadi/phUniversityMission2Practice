import z from 'zod'
import {
  academicSemesterCodeArray,
  academicSemesterMonthArray,
  academicSemesterNameArray,
} from './academicSemester.model'

export const zodCreateAcademicSemesterValidationSchema = z.object({
  body: z.object({
    name: z.enum(academicSemesterNameArray),
    year: z.date(),
    code: z.enum(academicSemesterCodeArray),
    startMonth: z.enum(academicSemesterMonthArray),
    endMonth: z.enum(academicSemesterMonthArray),
  }),
})
