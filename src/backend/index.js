const path = require('path')
const express = require('express')
const files = require('./fs-api')
const fs = require('fs')

const app = express()

app.get('/health', (req, res) => {
  res.status(200).send('OK')
})

/* Routes */

/**
 * Get all files
 */
// app.get('/', (req, res) => {
//
// })

// const PASSWORD = 'c00lpaSSw0rD'

/**
 * Create a file
 */
app.post('/', (req, res) => {
  files.encrypt('./input.md', './encrypted', req.query.password);
  // fs.createReadStream('./input.md').pipe(files.writeFileStream(req.params.name, req.query.password)).on('finish', () => res.status(200))
})

/**
 * Get one file
 */
app.get('/', (req, res) => {
  files.decrypt('./encrypted', './output.md', req.query.password);
  // files.readFileStream(path.resolve('.', './' + req.params.name), req.query.password).pipe(res)
})

/**
 * Delete a file
 */
// app.delete('/:id', (req, res) => {
  // file
// })

app.listen(8500)