import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import { UserRoutes } from './module/user/user.route'
const app: Application = express()

//middleware
app.use(cors())
//parsers
app.use(express.json())

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to PH University')
})

//routes
app.use('/api/v1/users', UserRoutes)

export default app
