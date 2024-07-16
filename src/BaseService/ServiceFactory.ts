import { RequestHandler } from 'express'
import { DependencyProvider } from './DependencyProvider'
import { IExecutableService } from './ExecutableService'
import { IDatabase } from '#/Database/Database'
import { IQueryExecutor } from '#/Database/QueryExecutor'

class ServiceFactory {
  public static async initialize() {
    await DependencyProvider.initialize()
  }

  public static async makeService<T extends IExecutableService>(
    Service: new (database: IDatabase, queryExecutor: IQueryExecutor) => T
  ): Promise<T> {
    await this.initialize()
    const database = DependencyProvider.getDatabase()
    const queryExecutor = DependencyProvider.getQueryExecutor()
    return new Service(database, queryExecutor)
  }

  public static getHandler<T extends IExecutableService>(
    Service: new (database: IDatabase, queryExecutor: IQueryExecutor) => T
  ): RequestHandler {
    return async (req, res, next) => {
      try {
        const serviceInstance = await this.makeService(Service)
        await serviceInstance.exec(req, res, next)
      } catch (error) {
        next(error)
      }
    }
  }
}

export { ServiceFactory }
