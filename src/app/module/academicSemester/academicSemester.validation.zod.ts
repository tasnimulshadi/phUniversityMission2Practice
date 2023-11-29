import z from 'zod'
import {
  academicSemesterCodeArray,
  academicSemesterMonthArray,
  academicSemesterNameArray,
} from './academicSemester.constant'

export const zodCreateAcademicSemesterValidationSchema = z.object({
  body: z.object({
    name: z.enum([...academicSemesterNameArray] as [string, ...string[]]),
    year: z.date(),
    code: z.enum([...academicSemesterCodeArray] as [string, ...string[]]),
    startMonth: z.enum([...academicSemesterMonthArray] as [
      string,
      ...string[],
    ]),
    endMonth: z.enum([...academicSemesterMonthArray] as [string, ...string[]]),
  }),
})
