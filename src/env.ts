import { z } from 'zod'
import 'dotenv/config'
import { AppError } from './utils/app-error'

const envSchema = z.object({
  PORT: z.coerce.number().default(3333),
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  DATABASE_URL: z.url(),
  AUTH_SECRET: z.string().min(32),
  EXPIRES_IN: z.string().default('1d'),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error(
    '❌ Invalid environment variables:',
    z.prettifyError(_env.error),
  )
  throw new AppError('Invalid environment variables')
}

export const env = _env.data
