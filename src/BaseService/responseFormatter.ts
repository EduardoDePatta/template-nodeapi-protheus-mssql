import { Request, Response, NextFunction } from 'express'

interface ApiResponse<T = any> {
  status: number
  message: string
  data?: T
}

const responseFormatter = (req: Request, res: Response, next: NextFunction) => {
  req.sendResponse = <T>(response: ApiResponse<T>) => {
    const { status, message, data } = response
    res.status(status).json({ message, data })
  }
  next()
}

export { responseFormatter, ApiResponse }
