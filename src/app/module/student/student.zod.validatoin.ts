import z from 'zod'

export const zodStudentValidationSchema = z.object({
  body: z.object({
    studentData: z.object({
      name: z.object({
        firstName: z.string(),
        lastName: z.string(),
      }),
      gender: z.enum(['male', 'female', 'other']),
      dateOfBirth: z.string(),
      email: z.string().email(),
      contactNo: z.string().max(11).min(11),
      emegencyContactNo: z.string().max(11).min(11),
      presentAddress: z.string(),
      permanentAddress: z.string(),
      guadian: z.object({
        name: z.string(),
        relation: z.string(),
      }),
      localGuadian: z.object({
        name: z.string(),
        relation: z.string(),
      }),
      profileImage: z.string(),
      academicDepartment: z.object({}).optional(),
    }),
  }),
})
