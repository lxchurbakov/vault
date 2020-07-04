import redis from 'redis'

const client = redis.createClient(6379, 'localhost')

client.on('error', (err) =>
  console.error('Redis error', err)
)

client.on('reconnecting', (info) =>
  console.warn(`Redis reconnection`, info)
)

const nodebackToPromise = <A extends any[], T>(f) => (...args: A) =>
  new Promise<T>((resolve, reject) =>
    f(...args, (err, res: T) => (err ? reject(err) : resolve(res)))
  )

const hset = nodebackToPromise<[string, string, string], void>((key: string, field: string, value: string, cb: any) =>
  client.hset(key, field, value, cb)
)

const hget = nodebackToPromise<[string, string], string>((key: string, field: string, cb: any) =>
  client.hget(key, field, cb)
)

const hgetall = nodebackToPromise<[string], { [key: string]: string }>((key: string, cb: any) =>
  client.hgetall(key, cb)
)

const hdel = nodebackToPromise<[string, string[]], void>((key: string, fields: string[], cb: any) =>
  client.hdel(key, ...fields, cb)
)

const health = () => nodebackToPromise<[], void>((cb: any) => client.ping(cb))().then(() => true).catch(() => false)

export default { hset, hget, hgetall, hdel, health }
