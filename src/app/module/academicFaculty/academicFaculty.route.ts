import express from 'express'
import { academicFacultyValidationSchema as createAcademicFacultyValidationSchema } from './academicFaculty.validation'
import validateRequest from '../../uttils/validateRequest'
import { AcademicFacultyControllers } from './academicFaculty.controller'

const router = express.Router()

//create
router.post(
  '/create',
  validateRequest(createAcademicFacultyValidationSchema),
  AcademicFacultyControllers.createAcademicFaculty,
)

//get all
router.get('/', AcademicFacultyControllers.getAllAcademicFaculty)

//get 1 by id
router.get(
  '/:academicFacultyId',
  AcademicFacultyControllers.getAcademicFacultyById,
)

//update
router.patch(
  '/:academicFacultyId',
  validateRequest(createAcademicFacultyValidationSchema),
  AcademicFacultyControllers.updateAcademicFaculty,
)

export const AcademicFacultyRoutes = router
