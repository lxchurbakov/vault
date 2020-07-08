import crypto from 'crypto'

const SALT = 'some-g00d-S4LT'

export default {
  randomToken: () => {
    return (new Array(5)).fill(0).map(() => Math.random().toString(16).split('.')[1]).join('').slice(0, 60)
  },
  
  passwordHash: (password: string) => {
    return crypto.createHash('sha256').update(password + '/' + SALT).digest().toString('base64')
  },
}