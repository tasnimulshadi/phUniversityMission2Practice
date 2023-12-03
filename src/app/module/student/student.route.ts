import express from 'express'
import { StudentControllers } from './student.controller'

const router = express.Router()

//get all
router.get('/', StudentControllers.getAllStudents)

//get 1
router.get('/:studentId', StudentControllers.getStudentById)

export const StudentRoutes = router

/*

*/ 