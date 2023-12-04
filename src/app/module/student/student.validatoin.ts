import z from 'zod'

export const zodCreateStudentValidationSchema = z.object({
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
      academicDepartment: z.string(),
      academicSemester: z.string(),
    }),
  }),
})


export const zodUpdateStudentValidationSchema = z.object({
  body: z.object({
    studentData: z.object({
      name: z.object({
        firstName: z.string().optional(),
        lastName: z.string().optional(),
      }).optional(),
      gender: z.enum(['male', 'female', 'other']).optional(),
      dateOfBirth: z.string().optional(),
      email: z.string().email().optional(),
      contactNo: z.string().max(11).min(11).optional(),
      emegencyContactNo: z.string().max(11).min(11).optional(),
      presentAddress: z.string().optional(),
      permanentAddress: z.string().optional(),
      guadian: z.object({
        name: z.string().optional(),
        relation: z.string().optional(),
      }).optional(),
      localGuadian: z.object({
        name: z.string().optional(),
        relation: z.string().optional(),
      }).optional(),
      profileImage: z.string().optional(),
      academicDepartment: z.string().optional(),
      academicSemester: z.string().optional(),
    }),
  }),
})
