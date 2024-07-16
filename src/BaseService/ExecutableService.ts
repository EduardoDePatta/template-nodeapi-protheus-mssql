import { Request, Response, NextFunction } from 'express';

export interface IExecutableService<B = any, P = any, Q = any> {
  exec(req: Request<P, any, B, Q>, res: Response, next: NextFunction): Promise<void>
}
