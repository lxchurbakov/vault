require('dotenv')
import dotenv from 'dotenv'

dotenv.config()

import express from 'express'
import bodyParser from 'body-parser'

import database from './libs/database'
import redis from './libs/redis'

import vaultsRouter from './routes/vaults'

const app = express()

app.use(bodyParser.json())

/* Disable CORS */
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
  next()
})

app.get('/health', async (req, res) => {
  res.status(200).json({
    database: await database.health(),
    redis: await redis.health(),
  })
})

/* Vaults router */
app.use('/vaults', vaultsRouter)

/* Error middleware */
app.use((err, req, res, next) => {
  if (!!err.code) {
    res.status(err.code).send(err.toString())
  } else {
    res.status(500).send(err.toString())
  }
})

app.listen(process.env.SERVER_PORT, () => {
  console.log('Server is listening at', process.env.SERVER_PORT)
})
