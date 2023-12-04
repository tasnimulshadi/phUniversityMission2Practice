import express from 'express'
import { StudentControllers } from './student.controller'
import { zodUpdateStudentValidationSchema } from './student.validatoin'
import validateRequest from '../../uttils/validateRequest'

const router = express.Router()

//get all
router.get('/', StudentControllers.getAllStudents)

//get 1
router.get('/:studentId', StudentControllers.getStudentById)

//delete
router.delete('/:studentId', StudentControllers.deleteStudent)

//update
router.patch(
  '/:studentId',
  validateRequest(zodUpdateStudentValidationSchema),
  StudentControllers.updateStudent,
)

export const StudentRoutes = router
