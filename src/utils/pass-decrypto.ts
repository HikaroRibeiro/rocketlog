import { compareSync } from 'bcrypt'

function passDecrypto(encryptedPassword: string, password: string) {
  return compareSync(password, encryptedPassword)
}
export { passDecrypto }
