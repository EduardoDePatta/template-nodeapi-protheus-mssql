import { Database, IDatabase } from "#/Database/Database";
import { IQueryExecutor, QueryExecutor } from "#/Database/QueryExecutor";


class DependencyProvider {
  private static databaseInstance: IDatabase | null = null;
  private static queryExecutorInstance: IQueryExecutor | null = null;

  public static async initialize() {
    if (!this.databaseInstance) {
      this.databaseInstance = new Database();
      await this.databaseInstance.connect();
    }
    if (!this.queryExecutorInstance) {
      this.queryExecutorInstance = new QueryExecutor(this.databaseInstance);
    }
  }

  public static getDatabase(): IDatabase {
    if (!this.databaseInstance) {
      throw new Error('Database instance is not initialized.');
    }
    return this.databaseInstance;
  }

  public static getQueryExecutor(): IQueryExecutor {
    if (!this.queryExecutorInstance) {
      throw new Error('QueryExecutor instance is not initialized.');
    }
    return this.queryExecutorInstance;
  }
}

export { DependencyProvider };
