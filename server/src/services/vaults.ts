import database from '../libs/database'
import { createUUID, getPasswordHash, generateSalt } from '../libs/utils'

export type Vault = {
  id: number
  name: string
  token: string
  created_at: Date
}

export type Credential = {
  id: number
  vault_id: string
  password_hash: string
  salt: string
  iterations: number
  created_at: Date
}

/**
 * Vaults service is used to manage vaults (and credentials)
 */
export default {
  getAll: () =>
    database.query<Vault[]>(`SELECT * FROM vaults`, []),

  getByToken: (token: string) =>
    database.queryOne<Vault>(`SELECT * FROM vaults WHERE token = ?`, [token]),

  /**
   * Create a Vault and corresponding Credential by name and password
   */
  create: async (name: string, password: string) => {
    /* Create a Vault */
    const token = createUUID()
    const { insertId } = await database.query<{ insertId: number }>(`INSERT INTO vaults(name, token) VALUES(?, ?)`, [name, token])

    /* Then, create a Credential */
    const salt = generateSalt()
    const iterations = Math.floor(Math.random() * 100 + 100)
    const passwordHash = await getPasswordHash(password, salt, iterations)

    await database.query(`INSERT INTO credentials(vault_id, password_hash, salt, iterations) VALUES(?, ?, ?, ?)`, [insertId, passwordHash, salt, iterations])

    return token
  },

  /**
   * Verify that password is correct for Vault by token and password
   */
  verify: async (vaultToken: string, password: string) => {
    /* Find Vault */
    const vault = await database.queryOne<Vault>(`SELECT * FROM vaults WHERE token = ?`, [vaultToken])
    if (!vault) return false

    /* Find Credential */
    const credential = await database.queryOne<Credential>(`SELECT * FROM credentials WHERE vault_id = ?`, [vault.id])
    if (!credential) return false

    /* Compare provided password's hash and stored hash */
    return credential.password_hash === await getPasswordHash(password, credential.salt, credential.iterations)
  },
}