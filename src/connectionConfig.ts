import sql from 'mssql'
import environments from './environments'

const dbConfig: sql.config = {
  server: environments.DB_HOST,
  authentication: {
    type: 'default',
    options: {
      userName: environments.DB_USER,
      password: environments.DB_PASSWORD,
    }
  },
  options: {
    encrypt: false,
    database: environments.DB_DATABASE,
    requestTimeout: 6000000,
  }
}

export { dbConfig }
