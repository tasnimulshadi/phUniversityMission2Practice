import express from 'express'
import { UserControllers } from './user.controller'
import validateRequest from '../../uttils/validateRequest'
import { zodCreateStudentValidationSchema } from '../student/student.validatoin'

const router = express.Router()

router.post(
  '/create-student',
  validateRequest(zodCreateStudentValidationSchema), //zod validation
  UserControllers.createStudent,
)

export const UserRoutes = router

//
