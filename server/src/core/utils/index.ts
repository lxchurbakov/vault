class HttpError extends Error {
  code: number
  constructor (code, ...args) {
    super(...args)

    this.code = code
  }
}

export { HttpError }

const asyncMiddleware = (f) => (req, res, next) => {
  f(req, res).catch((err) => {
    next(err)
  })
}

export { asyncMiddleware }