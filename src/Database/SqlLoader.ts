import { readFileSync } from 'fs';
import { join } from 'path';

class SqlLoader {
  static getQuery(dir: string, fileName: string): string {
    const filePath = join(dir, fileName)
    return readFileSync(filePath, 'utf-8')
  }

  static replaceParams(query: string, params: { [key: string]: any }): string {
    let finalQuery = query
    for (const [key, value] of Object.entries(params)) {
      const safeValue = typeof value === 'string' ? `'${value}'` : value
      finalQuery = finalQuery.replace(new RegExp(`@${key}`, 'g'), safeValue)
    }
    return finalQuery
  }
}

export { SqlLoader }
