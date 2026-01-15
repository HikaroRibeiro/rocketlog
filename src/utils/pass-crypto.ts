import { hash } from 'bcrypt'

async function passCrypto(password: string) {
  const passEncrypted = await hash(password, 10)
  return passEncrypted
}

export { passCrypto }
