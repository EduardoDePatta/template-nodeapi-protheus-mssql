import { NextFunction, Request, Response } from "express"
import { HttpException } from "../exceptions"
import jwt from 'jsonwebtoken'
import environments from "#/environments"
import { ApiResponse } from "#/BaseService/responseFormatter"

declare global {
  namespace Express {
    interface Request {
      token: string
      sendResponse: <T>(response: ApiResponse<T>) => void
    }
  }
}

const verifyToken = (req: Request, _res: Response, next: NextFunction) =>  {
  const authHeader = req.headers.authorization
  if (!authHeader) return next(new HttpException(401, 'Authorization header is missing.'))
  const token = authHeader && authHeader.split(' ')[1]

  if (token === null) return next(new HttpException(401, 'A token is required for authentication.'))

  try {
    const decoded = jwt.verify(token, environments.APP_SECRET)
    // req.user = decoded.user
    req.token = token
  } catch (error) {
    next(new HttpException(403, 'Invalid token.'))
  }
  next()
}

export { verifyToken }
