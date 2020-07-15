import database from '../libs/database'
import { createUUID, getPasswordHash } from '../libs/utils'

export type Vault = {
  id: number
  name: string
  token: string
  password_hash: string
  created_at: Date
}

export default {
  getAll: () =>
    database.query<Vault[]>(`SELECT * FROM vaults`, []),

  getByToken: (token: string) =>
    database.queryOne<Vault>(`SELECT * FROM vaults WHERE token = ?`, [token]),

  create: async (name, password) =>
    database.query<{ insertId: number }>(
      `INSERT INTO vaults(name, token, password_hash) VALUES(?, ?, ?)`, [
        name, createUUID(), getPasswordHash(password)
      ]
    ).then(({ insertId }) =>
      database.queryOne<Vault>(`SELECT * FROM vaults WHERE id = ?`, [insertId])
    ),
}