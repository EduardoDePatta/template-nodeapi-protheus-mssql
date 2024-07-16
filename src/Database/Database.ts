import { dbConfig } from "#/connectionConfig"
import { ConnectionPool, Transaction } from "mssql"
export interface IDatabase {
  pool: ConnectionPool
  connect(): Promise<void>
  beginTransaction(): Promise<Transaction>
  close(): Promise<void>
  getPool(): ConnectionPool
}
class Database implements IDatabase {
  public pool: ConnectionPool

  constructor() {
    this.pool = new ConnectionPool(dbConfig)
  }

  public async connect() {
    if (!this.pool.connected) {
      await this.pool.connect()
      console.log('Database connected successfully')
    }
  }

  public async beginTransaction(): Promise<Transaction> {
    await this.connect()
    const transaction = new Transaction(this.pool)
    await transaction.begin()
    return transaction
  }

  public async close(): Promise<void> {
    if (this.pool.connected) {
      await this.pool.close()
      console.log('Database connection closed.')
    }
  }

  public getPool(): ConnectionPool {
    return this.pool
  }
}

export { Database }
