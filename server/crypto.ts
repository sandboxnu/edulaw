import {
  scryptSync,
  randomBytes,
  createCipheriv,
  createDecipheriv,
} from 'crypto'

const algorithm = 'aes-192-cbc'
const password = process.env.SCRYPT_PASSWORD || 'fallback_password'

export const encrypt = (value?: string) => {
  if (!value) return ''
  const salt = randomBytes(16)
  const iv = randomBytes(16)
  const key = scryptSync(password, salt, 24)
  const cipher = createCipheriv(algorithm, key, iv)
  let encrypted = cipher.update(
    `${salt.toString('hex')}:${iv.toString('hex')}:value`,
    'utf8',
    'hex'
  )
  encrypted += cipher.final('hex')
  return encrypted
}

export const decrypt = (value?: string) => {
  if (!value) return ''
  const [salt, iv, ciphertext] = value.split(':')
  const key = scryptSync(password, salt, 24)
  const decipher = createDecipheriv(algorithm, key, iv)
  let decrypted = decipher.update(ciphertext, 'hex', 'utf8')
  decrypted += decipher.final('utf8')
  return decrypted
}
