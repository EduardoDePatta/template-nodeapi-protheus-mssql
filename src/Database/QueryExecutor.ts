import { Request } from 'mssql'
import { QueryOptions, sqlTypeMap } from './types'
import { HttpException } from '#/exceptions'
import { IDatabase } from './Database'
import { logger } from '#/logger'
import { MakeTables, TableKeyDynamic } from './MakeTables'
interface IQueryExecutor {
  one<T>(options: QueryOptions): Promise<T>
  oneOrNone<T>(options: QueryOptions): Promise<T | null>
  many<T>(options: QueryOptions): Promise<T[]>
  manyOrNone<T>(options: QueryOptions): Promise<T[]>
  none(options: QueryOptions): Promise<void>
}
class QueryExecutor implements IQueryExecutor {
  constructor(private database: IDatabase) {}

  private replaceTableKeys(query: string, tableKeys: TableKeyDynamic): string {
    for (const key in tableKeys) {
      if (tableKeys.hasOwnProperty(key)) {
        const code = tableKeys[key as keyof TableKeyDynamic]
        if (code !== undefined && MakeTables[key as keyof typeof MakeTables]) {
          const tableName = MakeTables[key as keyof typeof MakeTables](code)
          query = query.replace(new RegExp(`\\{${key}\\}`, 'g'), tableName)
        }
      }
    }
    return query
  }

  private async executeQuery<T>({ query, params = [], tableKeys }: QueryOptions): Promise<T[]> {
    const request = new Request(this.database.getPool())
    query = this.replaceTableKeys(query, tableKeys || {})

    params.forEach(({ name, type, value, length, precision, scale }) => {
      const sqlType = sqlTypeMap[type](length, precision, scale)
      request.input(name, sqlType, value)
    })

    logger.info(query)
    const result = await request.query(query)
    return result.recordset
  }

  public async one<T>(options: QueryOptions): Promise<T> {
    const results = await this.executeQuery<T>(options)
    if (results.length !== 1) throw new HttpException(500, 'Query did not return exactly one result')
    return results[0]
  }

  public async oneOrNone<T>(options: QueryOptions): Promise<T | null> {
    const results = await this.executeQuery<T>(options)
    if (results.length > 1) throw new HttpException(500, 'Query returned more than one result')
    return results[0] || null
  }

  public async many<T>(options: QueryOptions): Promise<T[]> {
    const results = await this.executeQuery<T>(options)
    if (results.length === 0) throw new HttpException(500, 'Query did not return any results')
    return results
  }

  public async manyOrNone<T>(options: QueryOptions): Promise<T[]> {
    return this.executeQuery<T>(options)
  }

  public async none(options: QueryOptions): Promise<void> {
    const results = await this.executeQuery<void>(options)
    if (results.length !== 0) throw new HttpException(500, 'Query returned results when none were expected')
  }
}

export { QueryExecutor, IQueryExecutor, QueryOptions }
