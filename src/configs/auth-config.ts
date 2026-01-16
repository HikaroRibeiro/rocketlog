import { env } from '../env'
export const authConfig = {
  jwt: {
    secret: env.AUTH_SECRET,
    expiresIn: env.EXPIRES_IN,
  },
}
