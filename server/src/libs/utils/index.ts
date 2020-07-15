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

export const getPasswordHash = (password: string) => {
  return crypto.createHash('sha256').update(password + '/' + process.env.SALT).digest().toString('base64')
}

export const createJWT = (data: any) => {
  return jwt.sign(data, process.env.JWT_SECRET)
}

export const readJWT = (token: string): any => {
  return jwt.verify(token, process.env.JWT_SECRET)
}

export const createUUID = () => {
  return uuid()
}