import redis from 'redis'

const client = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
})

client.on("error", console.error)

export default {
  health: () => new Promise((resolve, reject) => {
    client.get("hkeys", (err) => {
      if (err) {
        reject(err)
      } else {
        resolve()
      }
    })
  }),
}

// const redis = require("redis");




