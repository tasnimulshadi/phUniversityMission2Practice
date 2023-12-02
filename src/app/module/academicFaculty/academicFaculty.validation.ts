import z from 'zod'

export const academicFacultyValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'name must be a atring',
    }),
  }),
})
