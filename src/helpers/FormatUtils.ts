import path from "path"
import fs from 'fs'

class FormatUtil {
  static makeDigits(data: string, numberOfDigits: number = 2) {
    return data.padStart(numberOfDigits, '0')
  }

  static getQuery(directory: string, filename: string): string {
    const filePath = path.join(directory, filename)
    const content = fs.readFileSync(filePath, 'utf-8')
    return content
  }
}

export { FormatUtil }
