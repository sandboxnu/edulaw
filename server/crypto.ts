import {
  scryptSync,
  randomBytes,
  createCipheriv,
  createDecipheriv,
} from 'crypto'
import { Buffer } from 'buffer'
import { genSaltSync } from 'bcryptjs'

const algorithm = 'aes-192-cbc'
const password = process.env.SCRYPT_PASSWORD || 'fallback_password'
const salt = genSaltSync(10)
const key = scryptSync(password, salt, 24)
const iv = randomBytes(16)

export const encrypt = (value?: string) => {
  if (!value) return ''
  const cipher = createCipheriv(algorithm, key, iv)
  let encrypted = cipher.update(value, 'utf8', 'hex')
  encrypted += cipher.final('hex')
  return encrypted
}

export const decrypt = (value?: string) => {
  if (!value) return ''
  const decipher = createDecipheriv(algorithm, key, iv)
  let decrypted = decipher.update(value, 'hex', 'utf8')
  decrypted += decipher.final('utf8')
  return decrypted
}
