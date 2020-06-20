import express from 'express'
import bodyParser from 'body-parser'

import vaults from './vaults'
import database from './database'

/* Create the application */
const app = express()

app.use(bodyParser.json())

app.get('/health', async (req, res) => {
  res.status(200).json({
    database: await database.health(),
  })
})

/* Vaults router */
app.use('/vaults', vaults)

app.use((err, req, res, next) => {
  if (!!err.code) {
    res.status(err.code).send(err.toString())
  } else {
    res.status(500).send(err.toString())
  }
})

/* Startup */
app.listen(8500)