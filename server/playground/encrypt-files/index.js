const fs = require('fs')
const crypto = require('crypto')

const initVect = crypto.createHash('sha256').update(crypto.randomBytes(16)).digest().slice(0, 16)

const key = `14189dc35ae35e75ff31d7502e245cd9bc7803838fbfd5c773cdcd79b8a28bbd`.slice(0, 32)
const cipher = crypto.createCipheriv('aes-256-cbc', key, initVect)
const decipher = crypto.createDecipheriv('aes-256-cbc', key, initVect)

fs.createReadStream('./input.md')
  .pipe(cipher)
  .pipe(fs.createWriteStream('./encrypted'))

// fs.createReadStream('./encrypted')
//   .pipe(decipher)
//   .pipe(fs.createWriteStream('./output.md'))

// fs.createReadStream('./input.md')
//   .pipe(cipher)
//   .pipe(decipher)
//   .pipe(fs.createWriteStream('./output.md'))

/* TODO: looks like chunk sizes do not match on the first line - may need to reinvent the transforming pipe */