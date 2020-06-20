import express from 'express'
import files from './files'

import database from '../database'
import security from '../security'

import { HttpError, asyncMiddleware } from '../utils'

const router = express.Router()

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

  const vault = await database.queryOne(`SELECT * FROM vault WHERE token = ?`, [vaultToken])

  if (!vault) {
    throw new HttpError(404, 'The vault is not found')
  }

  res.status(200).json(vault)
  /* Create a token */
  /* Store it in redis */
}))

/* Get vault info (token: string) */
router.get('/:vaultId', (req, res) => {
  /* Validate the token */
  /* Retrieve data from db */
})

/* Update the vault (token: string, body: ?) */
router.put('/:vaultId', (req, res) => {
  /* Validate the token */
  /* Update the database object */
})

/* Delete the vault (token: string) */
router.delete('/:vaultId', (req, res) => {
  /* Validate the token */
  /* Delete data in db + files cascade */
})

/* Get vault files hierarchy (token: string, path: string = '/') */
router.use('/:vaultId/files', files)

export default router