require('dotenv')
import dotenv from 'dotenv'

dotenv.config({ path: '.env.dev' })
dotenv.config()

import sql from './storage/sql'
import redis from './storage/redis'

import express from 'express'

const app = express()

const safe = async (f) => {
  try {
    await f()
    return true
  } catch (e) {
    console.log(e)
    return false
  }
}

app.get('/health', async (req, res) => {
  res.json({
    sql: await safe(sql.health),
    redis: await safe(redis.health),
  })
})

app.listen(process.env.SERVER_PORT, () => {
  console.log('Server is listening at', process.env.SERVER_PORT)
})