import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import { v4 as uuid } from 'uuid'

/**
 * HTTP and express utils
 */

export class HttpError extends Error {
  code: number
  constructor (code, ...args) {
    super(...args)

    this.code = code
  }
}

export const routeHandler = (f) => (req, res, next) => {
  try {
    f(req, res).catch((err) => {
      next(err)
    })
  } catch (e) {
    next(e)
  }
}

/**
 * Security utils
 */

export const createJWT = (data: any) => {
  return jwt.sign(data, process.env.JWT_SECRET)
}

export const readJWT = (token: string): any => {
  return jwt.verify(token, process.env.JWT_SECRET)
}

export const createUUID = () => {
  return uuid()
}

export const generateSalt = () => {
  return crypto.randomBytes(128).toString('base64')
}

export const getPasswordHash = async (password: string, salt: string, iterations: number) => {
  return crypto.pbkdf2Sync(password, salt, iterations, 512, process.env.HASH_FUNC).toString('hex')
}
