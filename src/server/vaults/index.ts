// POST /vaults (password: string) -> OK (id) id is long random generated uuid string
// POST /vaults/:id/login (password: string) -> One time token for this vault // one time token binds to IP and is time limited
// PUT /vaults/:id (token: string) -> Update vault password?
// DELETE /vaults/:id (token: string) -> delete the vault and all of it's files
//
// GET / vaults/:id (token: string) -> Vault info
// GET /vaults/:id/files (token: string, path: string) -> Vault files list (tree structure with ids?)
// POST /vaults/:id/files (token: string) -> Vault file upload
// GET /vault/:id/files/:id -> download a file
// DELETE /vault/:id/files/:id -> delete a file

import express from 'express'

const router = express.Router()

/* Create a vault (password: string, body: ?) */
router.post('/', (req, res) => {

})

/* Login to the vault (password: string) */
router.post('/:id/login', (req, res) => {

})

/* Update the vault (token: string, body: ?) */
router.put('/:id', (req, res) => {

})

/* Delete the vault (token: string) */
router.delete('/:id', (req, res) => {

})

/* Get vault info (token: string) */
router.get('/:id', (req, res) => {

})

/* Get vault files hierarchy (token: string, path: string = '/') */
router.get('/:id/files', (req, res) => {

})

/* Download a file (token: string) */
router.get('/:id/files/:id', (req, res) => {

})

/* Upload a file (token: string) */
router.post('/:id/files', (req, res) => {

})

/* Delete a file by id (token: string) */
router.delete('/:id/files/:id', (req, res) => {

})

export default router