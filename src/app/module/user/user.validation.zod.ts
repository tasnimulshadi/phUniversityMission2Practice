import z from 'zod'

// not all information is comming from the users end,
// some info are generated during data insertion from mongoose schema,
// so the validation fields are less then the mongoose schema
const zoduserSchema = z.object({
  password: z
    .string({
      invalid_type_error: 'Password must be a string',
    })
    .max(20, { message: 'Password cannot be more than 20 characters' }),
  role: z.enum(['admin', 'student', 'faculty']),
})

export default zoduserSchema
