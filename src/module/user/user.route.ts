import express, { Request, Response } from 'express'

const router = express.Router()

router.post('/create', UserRouter.create)
// create route
// export router
