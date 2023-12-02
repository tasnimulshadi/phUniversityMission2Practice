import z from 'zod'

export const academicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'must be a string',
      required_error: 'it is a required field',
    }),
    academicFaculty: z.string({
      invalid_type_error: 'must be a string',
      required_error: 'it is a required field',
    }),
  }),
})
