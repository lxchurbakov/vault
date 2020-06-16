import express from 'express'
import files from './files'

const router = express.Router()

/* Create a vault (password: string, body: ?) */
router.post('/', (req, res) => {
  /* Validated the body and the password */
  /* Create an id */
  /* Create an object in database */
})

/* Login to the vault (password: string) */
router.post('/:vaultId/login', (req, res) => {
  /* Validate the password */
  /* Create a token */
  /* Store it in redis */
})

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