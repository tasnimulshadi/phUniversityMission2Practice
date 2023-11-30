import z from 'zod'
import {
  academicSemesterCodeArray,
  academicSemesterMonthArray,
  academicSemesterNameArray,
} from './academicSemester.constant'

export const zodCreateAcademicSemesterValidationSchema = z.object({
  body: z.object({
    name: z.enum([...academicSemesterNameArray] as [string, ...string[]], {
      invalid_type_error: 'invalid type. must me a string like ("spring")',
      required_error: 'name field is required',
    }),
    year: z.string({
      invalid_type_error: 'invalid type. must me a string like ("2030")',
      required_error: 'year field is required',
    }),
    code: z.enum([...academicSemesterCodeArray] as [string, ...string[]], {
      invalid_type_error: 'invalid type',
      required_error: 'code field is required',
    }),
    startMonth: z.enum(
      [...academicSemesterMonthArray] as [string, ...string[]],
      {
        invalid_type_error: 'invalid type, must me a string like ("january")',
        required_error: 'startMonth field is required',
      },
    ),
    endMonth: z.enum([...academicSemesterMonthArray] as [string, ...string[]], {
      invalid_type_error: 'invalid type, must me a string like ("january")',
      required_error: 'endMonth field is required',
    }),
  }),
})

//[string, ...string[] is suggested by zod
