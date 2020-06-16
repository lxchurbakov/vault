import express from 'express'

const router = express.Router({ mergeParams: true })

// + vaultId param everywhere

/* Get vault files hierarchy (token: string, path: string = '/') */
router.get('/', (req, res) => {
  /* Validate the token */
  /* Get all files from db with path starting from PATH */
})

/* Upload a file (token: string) */
router.post('/', (req, res) => {
  /* Validate the token */
  /* pipe file to cipher and save it in files folder with custom filename */
  /* Create a db instance with new filename (save old somwhere) */
})

/* Download a file (token: string, password: string) */
router.get('/:fileId', (req, res) => {
  /* validate the token */
  /* get all files from database */
  /* read them and pipe through cipher built on password */
})

/* Delete a file by id (token: string) */
router.delete('/:fileId', (req, res) => {
  /* validate the token */
  /* delete the file itself (encrypted) */
  /* Delete the db entry */
})

export default router