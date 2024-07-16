import environments from '#/environments'
import { HttpException } from '#/exceptions'
import nodemailer from 'nodemailer'
import { Transporter, SendMailOptions, SentMessageInfo } from 'nodemailer'
import { SendMailParams } from './interfaces'
import { SendReportDataTemplateParams, generateSendReportDataTemplate } from './templates'

export interface TemplateParamTypes {
  'report-data': SendReportDataTemplateParams
}

export type EmailTemplateType = keyof TemplateParamTypes

class Email {
  private transporter: Transporter<SentMessageInfo>

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: environments.EMAIL_HOST,
      port: Number(environments.EMAIL_PORT),
      secure: false,
      auth: {
        user: environments.EMAIL_USERNAME,
        pass: environments.EMAIL_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false
      }
    })
  }

  async sendMail<T extends EmailTemplateType>({ body, subject, template, to, data, attachments }: SendMailParams<T>): Promise<void> {
    const recipients = Array.isArray(to) ? to.join(', ') : to;
    const mailOptions: SendMailOptions = {
      from: 'totvs@personalcard.com.br',
      to: recipients,
      subject: subject,
      text: body,
      html: this.generateHtml(template, data),
      attachments: attachments?.map(att => ({
        filename: `${att.filename}.${att.extension}` ,
        content: att.content.split('base64')[1],
        encoding: 'base64'
      }))
    }

    try {
      await this.transporter.sendMail(mailOptions)
    } catch (error) {
      throw new HttpException(400, 'Ocorreu um erro ao enviar email.')
    }
  }

  private generateHtml<K extends EmailTemplateType>(type: K, data: TemplateParamTypes[K]): string {
    const generateTemplateRecord: Record<K, (data: TemplateParamTypes[K]) => string> = {
      'report-data': generateSendReportDataTemplate
    } as Record<K, (data: TemplateParamTypes[K]) => string>

    const action = generateTemplateRecord[type]
    if (!action) {
      throw new Error('Ocorreu um erro ao criar o template do email.')
    }
    return action(data)
  }
}

export default Email
