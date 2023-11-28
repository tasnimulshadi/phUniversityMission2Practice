import express, { Application, Request, Response } from 'express'
import cors from 'cors'
const app: Application = express()

//middleware
app.use(cors())
//parsers
app.use(express.json())

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to PH University')
})

export default app
