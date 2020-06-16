const fs = require('fs')
const crypto = require('crypto')
const Writable = require('stream').Writable

// const initVect = crypto.createHash('sha256').update(crypto.randomBytes(16)).digest().slice(0, 16)

// const key = `14189dc35ae35e75ff31d7502e245cd9bc7803838fbfd5c773cdcd79b8a28bbd`.slice(0, 32)
// const cipher = crypto.createCipheriv('aes-256-cbc', key, initVect)
// const decipher = crypto.createDecipheriv('aes-256-cbc', key, initVect)

// fs.createReadStream('./input.md')
//   .pipe(cipher)
//   .pipe(fs.createWriteStream('./encrypted'))

// fs.createReadStream('./encrypted')
//   .pipe(decipher)
//   .pipe(fs.createWriteStream('./output.md'))

// fs.createReadStream('./input.md')
//   .pipe(cipher)
//   .pipe(decipher)
//   .pipe(fs.createWriteStream('./output.md'))

/* TODO: looks like chunk sizes do not match on the first line - may need to reinvent the transforming pipe */

const createDecipher = (password) => {
  const key = crypto.createHash('sha256').update(password).digest().slice(0, 32)
  const initVect = crypto.createHash('sha256').update(crypto.randomBytes(16)).digest().slice(0, 16)

  return crypto.createDecipheriv('aes-256-cbc', key, initVect)
}

const createCipher = (password) => {
  const key = crypto.createHash('sha256').update(password).digest().slice(0, 32)
  const initVect = crypto.createHash('sha256').update(crypto.randomBytes(16)).digest().slice(0, 16)

  return crypto.createCipheriv('aes-256-cbc', key, initVect)
}

module.exports = {
  encrypt: (inputPath, outputPath, password) => {
    fs.createReadStream(inputPath)
      .pipe(createCipher(password))
      .pipe(fs.createWriteStream(outputPath))
  },

  decrypt: (inputPath, outputPath, password) => {
    fs.createReadStream(inputPath)
      .pipe(createDecipher(password))
      .pipe(fs.createWriteStream(outputPath))
  },

  //
  // readFileStream: (path, password) => {
  //   return fs.createReadStream(path).pipe(createDecipher(password))
  // },
  // writeFileStream: (path, password) => {
  //   const cipher = createCipher(password)
  //   const stream = fs.createWriteStream(path)
  //
  //   cipher.pipe(stream)
  //
  //   return new Writable({ objectMode: true, write: (chunk, encoding) => {
  //     cipher.push(chunk)
  //   }})
  // },
}