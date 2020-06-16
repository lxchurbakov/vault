import express from 'express'
import vaults from './vaults'

/* Create the application */

const app = express()

app.get('/health', (req, res) => {
  res.status(200).send('OK')
})

/* Vaults router */

app.use('/vaults', vaults)

/* Startup */

app.listen(8500)

export {}