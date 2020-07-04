import _ from 'lodash'
import express from 'express'

import database from '../../core/database'
import redis from '../../core/redis'
import security from '../../core/security'
import { HttpError, asyncMiddleware } from '../../core/utils'

import filesRouter from './files'

const router = express.Router()

export type Vault = { token: string, hash: string }

/* Create a vault (password: string) */
router.post('/', async (req, res) => {
  /* Validated the body and the password */
  const { password } = req.body

  /* Create a token and password hash */
  const token = security.randomToken()
  const hash = security.passwordHash(password)

  /* Create an object in database */
  await database.query(`INSERT INTO vault (token, hash) VALUES(?, ?)`, [token, hash])

  res.status(200).json({ token })
})

/* Login to the vault (password: string) */
router.post('/:vaultToken/login', asyncMiddleware(async (req, res) => {
  /* Validate the password */
  const { vaultToken } = req.params
  const { password } = req.body
  const hash = security.passwordHash(password)

  const vault = await database.queryOne<Vault>(`SELECT * FROM vault WHERE token = ? LIMIT 1`, [vaultToken])

  if (!vault || !vault.hash || vault.hash !== hash) {
    throw new HttpError(404, 'The vault is not found')
  }

  const authToken = security.randomToken()

  /* Store the auth -> vault token relation */
  await redis.hset('auths', authToken, vault.token)

  res.sendStatus(200)
}))

/**
 * All the code above requires authentication to work
 */

/* TODO put it out here */

/**
 * Get vault information by token
 */
router.get('/:vaultToken', asyncMiddleware(async (req, res) => {
  const { vaultToken } = req.params
  const { token } = req.query

  /* Validate the token from redis */
  const authVaultToken = await redis.hget('auths', token)

  if (!authVaultToken || vaultToken !== authVaultToken) {
    throw new HttpError(404, 'The vault is not found or the token is invalid')
  }

  const vault = await database.queryOne<Vault>(`SELECT * FROM vault WHERE token = ? LIMIT 1`, [vaultToken])
  const vaultView = _.omit(vault, ['hash'])

  res.status(200).json(vaultView)
}))

/**
 * Update the vault (there is actually nothing to update for now)
 */
router.put('/:vaultToken', asyncMiddleware(async (req, res) => {
  const { vaultToken } = req.params
  const { token } = req.query

  /* Validate the token from redis */
  const authVaultToken = await redis.hget('auths', token)

  if (!authVaultToken || vaultToken !== authVaultToken) {
    throw new HttpError(404, 'The vault is not found or the token is invalid')
  }

  /* Update the database object */

  /* / */
  res.sendStatus(200)
}))

/* Delete the vault (token: string) */
router.delete('/:vaultToken', (req, res) => {
  /* Validate the token */
  /* Delete data in db + files cascade */
})

/* Get vault files hierarchy (token: string, path: string = '/') */
router.use('/:vaultToken/files', filesRouter)

export default router