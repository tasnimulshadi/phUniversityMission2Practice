import express from 'express'
import { AcademicSemesterControllers } from './academicSemester.controller'
import validateRequest from '../../uttils/validateRequest'
import { zodCreateAcademicSemesterValidationSchema } from './academicSemester.validation.zod'

const router = express.Router()

router.post(
  '/create',
  validateRequest(zodCreateAcademicSemesterValidationSchema),
  AcademicSemesterControllers.createAcademicSemester,
)

//get all
router.get('/', AcademicSemesterControllers.getAllAcademicSemesters)
//get 1 by id
router.get('/:semesterId', AcademicSemesterControllers.getAcademicSemesterById)
//update 1 by id
router.patch(
  '/:semesterId',
  validateRequest(zodCreateAcademicSemesterValidationSchema),
  AcademicSemesterControllers.updateAcademicSemesterById,
)

export const AcademicSemesterRoutes = router
