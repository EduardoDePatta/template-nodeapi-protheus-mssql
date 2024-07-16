import { TemplateParamTypes } from "../Email"

interface Attachment {
  filename: string
  content: string
  extension: 'png'
}
export interface SendMailParams<T extends keyof TemplateParamTypes> {
  to: string | string[]
  subject: string
  body?: string
  template: T
  data: TemplateParamTypes[T]
  attachments?: Attachment[]
}