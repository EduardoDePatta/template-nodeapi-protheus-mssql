import { IDatabase } from '#/Database/Database'
import { IQueryExecutor } from '#/Database/QueryExecutor'
import { HTTP } from '#/helpers'
import { NextFunction, Response } from 'express'

export interface IBaseService<B = any, P = any, Q = any> {
  exec(req: HTTP.Req<B, P, Q>, res: Response, next: NextFunction): Promise<void>
}
abstract class BaseService<B = any, P = any, Q = any> implements IBaseService<B, P, Q> {
  protected database: IDatabase
  protected queryExecutor: IQueryExecutor
  protected repository?: IBaseService

  constructor(database: IDatabase, queryExecutor: IQueryExecutor, repository?: IBaseService) {
    this.database = database
    this.queryExecutor = queryExecutor
    if (repository) {
      this.repository = repository
    }
  }

  public abstract exec(req: HTTP.Req<B, P, Q>, res: Response, next: NextFunction): Promise<void>  
}

export { BaseService }
