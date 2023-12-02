import express from 'express'
import { UserRoutes } from '../module/user/user.route'
import { AcademicSemesterRoutes } from '../module/academicSemester/academicSemester.route'
import { AcademicFacultyRoutes } from '../module/academicFaculty/academicFaculty.route'
import { AcademicDepartmentRoutes } from '../module/academicDepartment/academicDepartment.route'

const router = express.Router()

// const routerArray: Array<{ path: string; route: Router }> = [
//   {
//     path: '/users',
//     route: UserRoutes,
//   },
//   {
//     path: '/academic-semester',
//     route: AcademicSemesterRoutes,
//   },
// ]

// routerArray.forEach((routeElement) => {
//   // router.use('/users', UserRoutes) demo
//   router.use(routeElement.path, routeElement.route)
// })

router.use('/users', UserRoutes)
router.use('/academic-semesters', AcademicSemesterRoutes)
router.use('/academic-faculties', AcademicFacultyRoutes)
router.use('/academic-departments', AcademicDepartmentRoutes)

export default router

/*

*/
