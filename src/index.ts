import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors'
import morgan from 'morgan'
import environments from './environments'
import { HttpException } from './exceptions'
import { sanitize } from 'sanitizer'
import helmet from 'helmet'
import errorMiddleware from './middlewares/errorMiddleware'
import { routerV1 } from './api'
import { responseFormatter } from './BaseService/responseFormatter'

const app = express()

app.use(cors())

app.use(sanitize)
app.use(helmet())

app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: true, limit: '50mb '}))
app.use(responseFormatter)

if (environments.NODE_ENV !== 'production') {
  app.use(morgan('dev'))
}

app.use('/api', routerV1)

app.all('*', (req: Request, _res: Response, next: NextFunction) => {
  next(new HttpException(500, `Can't find ${req.originalUrl} on this server!`))
})

app.use(errorMiddleware)

process.on('uncaughtException', (error: Error) => {
  console.log(`Error: ${error}\nShutting down...`)
  process.exit(1)
})

export default app
