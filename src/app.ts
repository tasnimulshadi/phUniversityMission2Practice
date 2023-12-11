import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
import notFound from './app/middlewares/notFound'
import router from './app/routes'
const app: Application = express()

//middleware
app.use(cors())
//parsers
app.use(express.json())

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to PH University')
})

//test
// app.get('/test', (req: Request, res: Response) => {
//   Promise.reject()
// })

//routes
app.use('/api/v1', router)

//global error handler
app.use(globalErrorHandler)

//API Not Found
app.use(notFound)

// export
export default app
