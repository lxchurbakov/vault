import mysql from 'mysql2'

const connection = mysql.createConnection({
  host     : 'localhost',
  port     : 32771,
  user     : 'root',
  password : 'password',
  database : 'test'
})

connection.connect();

export default {
  health: () => new Promise<boolean>((resolve, reject) => {
    connection.query('SELECT 1 + 1 AS solution', (error, results, fields) => {
      if (error) {
        resolve(false)
      } else {
        resolve(true)
      }
    })
  }),

  query: <T>(query: string, values: any[]) => new Promise<T[]>((resolve, reject) => {
    connection.query(query, values, (err, result, fields) => {
      if (err) {
        reject(err)
      } else {
        resolve(result)
      }
    })
  }),

  queryOne: <T>(query: string, values: any[]) => new Promise<T>((resolve, reject) => {
    connection.query(query, values, (err, result, fields) => {
      if (err) {
        reject(err)
      } else {
        resolve(result[0])
      }
    })
  }),
}