const { Client } = require('pg')

const client = new Client({
  user: process.env.SQL_USER,
  host: process.env.SQL_HOST,
  database: process.env.SQL_DATABASE,
  password: process.env.SQL_PASSWORD,
  port: process.env.SQL_PORT,
})

export default {
  health: async () => {
    await client.connect()
    await client.query('SELECT 1+1;')
    await client.end()
  },
}