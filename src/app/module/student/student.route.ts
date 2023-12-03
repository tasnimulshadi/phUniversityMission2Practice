import express from 'express'
import { StudentControllers } from './student.controller'

const router = express.Router()

//get all
router.get('/', StudentControllers.getAllStudents)

export const StudentRoutes = router
