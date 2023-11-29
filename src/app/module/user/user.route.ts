import express from 'express'
import { UserControllers } from './user.controller'
import validateRequest from '../../uttils/validateRequest'
import { zodStudentValidationSchema } from '../student/student.zod.validatoin'

const router = express.Router()

router.post(
  '/create-student',
  validateRequest(zodStudentValidationSchema), //zod validation
  UserControllers.createStudent,
)

export const UserRoutes = router

//
