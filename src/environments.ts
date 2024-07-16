import dotenv from 'dotenv'
dotenv.config()

export default {
  NODE_ENV: process.env.NODE_ENV ?? '',
  DB_HOST: process.env.DB_HOST ?? '',
  DB_USER: process.env.DB_USER ?? '',
  DB_DATABASE: process.env.DB_DATABASE ?? '',
  DB_PASSWORD: '',
  DB_PORT: Number(process.env.DB_PORT),
  PORT: Number(process.env.PORT),
  APP_SECRET: process.env.APP_SECRET ?? '',
  DB_DBDRIVER: process.env.DB_DBDRIVER ?? '',
  SHARED_VOLUME_PATH: process.env.SHARED_VOLUME_PATH,
  EMAIL_HOST: process.env.EMAIL_HOST ?? '',
  EMAIL_USERNAME:  process.env.EMAIL_USERNAME ?? '',
  EMAIL_PASSWORD: process.env.EMAIL_PASSWORD ?? '',
  EMAIL_PORT: Number(process.env.EMAIL_PORT),
  PROTHEUS_PASS: process.env.PROTHEUS_PASS ?? '',
  PROTHEUS_USER: process.env.PROTHEUS_USER ?? '',
  PROTHEUS_GRANT_TYPE: process.env.PROTHEUS_GRANT_TYPE ?? '',
  PROTHEUS_BASE_URL: process.env.PROTHEUS_BASE_URL ?? '',
}
