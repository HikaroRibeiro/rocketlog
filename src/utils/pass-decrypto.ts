import { compare } from 'bcrypt'

async function passDecrypto(encryptedPassword: string, password: string) {
  return await compare(password, encryptedPassword)
}
export { passDecrypto }
