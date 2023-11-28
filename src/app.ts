import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import { UserRoutes } from './app/module/user/user.route'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
import notFound from './app/middlewares/notFound'
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

//global error handler
app.use(globalErrorHandler)
//API Not Found
app.use(notFound)

// export
export default app
