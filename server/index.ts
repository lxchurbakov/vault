import express from 'express'
import bodyParser from 'body-parser'

import vaultsRouter from './routes/vaults'
import database from './core/database'
import redis from './core/redis'

/* Create the application */
const app = express()

/* Disable CORS */
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
  next()
})

app.use(bodyParser.json())

app.get('/health', async (req, res) => {
  res.status(200).json({
    database: await database.health(),
    redis: await redis.health(),
  })
})

/* Vaults router */
app.use('/vaults', vaultsRouter)

app.use((err, req, res, next) => {
  if (!!err.code) {
    res.status(err.code).send(err.toString())
  } else {
    res.status(500).send(err.toString())
  }
})

/* Startup */
app.listen(8500)