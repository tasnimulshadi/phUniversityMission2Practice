import express from 'express'
import validateRequest from '../../uttils/validateRequest'
import { academicDepartmentValidationSchema } from './academicDepartment.validation'
import { AcademicDepartmentControllers } from './academicDepartment.controller'

const router = express.Router()

//create
router.post(
  '/create',
  validateRequest(academicDepartmentValidationSchema),
  AcademicDepartmentControllers.createAcademicDepartment,
)

//get all
router.get('/', AcademicDepartmentControllers.getAllAcademicDepartment)

//get 1
router.get('/:id', AcademicDepartmentControllers.getAcademicDepartmentById)

// update
router.patch(
  '/:id',
  validateRequest(academicDepartmentValidationSchema),
  AcademicDepartmentControllers.updateAcademicDeparment,
)

export const AcademicDepartmentRoutes = router
