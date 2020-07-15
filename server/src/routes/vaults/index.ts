import _ from 'lodash'
import express from 'express'

import database from '../../libs/database'
import redis from '../../libs/redis'
import { createUUID, HttpError, routeHandler, getPasswordHash, createJWT, readJWT } from '../../libs/utils'

import vaults, { Vault } from '../../models/vaults'

// import filesRouter from './files'

const router = express.Router()

/**
 * Get All vaults (dev only)
 */
router.get('/', routeHandler(async (req, res) => {
  const data = await vaults.getAll()

  // res.json(data.map((vault) => _.pick(vault, ['name', 'token', 'created_at'])))
  res.json(data)
}))

/**
 * Create a vault
 */
router.post('/', routeHandler(async (req, res) => {
  const { name, password } = req.body
  const { token } = await vaults.create(name, password)

  res.json(token)
}))

/**
 * Login to the vault
 */
router.post('/:vaultToken/login', routeHandler(async (req, res) => {
  const { vaultToken } = req.params
  const { password } = req.body
  const passwordHash = getPasswordHash(password)

  const vault = await vaults.getByToken(vaultToken)

  if (!vault || vault.password_hash !== passwordHash) {
    throw new HttpError(404, 'Vault not found')
  }

  res.json(createJWT({ vaultToken }))
}))

/**
 * Get Vault information (name, created_at)
 */
router.get('/:vaultToken', routeHandler(async (req, res) => {
  const { vaultToken } = req.params
  const jwtToken = req.header('authorization')

  if (!jwtToken) {
    throw new HttpError(404, 'Vault not found')
  }

  const jwtData = readJWT(jwtToken)

  if (jwtData.vaultToken !== vaultToken) {
    throw new HttpError(404, 'Vault not found')
  }

  const vault = await vaults.getByToken(vaultToken)

  res.json(_.pick(vault, ['name', 'created_at']))
}))

/**
 * Update the vault
 */
// TODO

/**
 * Delete the vault
 */
// TODO

/**
 * Files router
 */
// TODO

//
// /**
//  * All the code below requires authentication to work
//  */
//
// const authMiddleware = async (req, res, next) => {
//   const { vaultToken } = req.params
//   const { token } = req.query
//
//   /* Validate the token from redis */
//   const authVaultToken = await redis.hget('auths', token || '')
//
//   if (!authVaultToken || vaultToken !== authVaultToken) {
//     next(new HttpError(404, 'The vault is not found or the token is invalid'))
//   } else {
//     next()
//   }
// }
//
// /**
//  * Get vault information by token
//  */
// router.get('/:vaultToken', authMiddleware, asyncMiddleware(async (req, res) => {
//   const { vaultToken } = req.params
//
//   const vault = await database.queryOne<Vault>(`SELECT * FROM vault WHERE token = ? LIMIT 1`, [vaultToken])
//   const vaultView = _.omit(vault, ['hash'])
//
//   res.status(200).json(vaultView)
// }))
//
// /**
//  * Update the vault (there is actually nothing to update for now)
//  */
// router.put('/:vaultToken', authMiddleware, asyncMiddleware(async (req, res) => {
//   const { vaultToken } = req.params
//
//   /* Update the database object */
//   // const vault = await database.queryOne<Vault>(`SELECT * FROM vault WHERE token = ? LIMIT 1`, [vaultToken])
//
//   /* / */
//   res.sendStatus(200)
// }))
//
// /* Delete the vault (token: string) */
// router.delete('/:vaultToken', (req, res) => {
//   /* Validate the token */
//   /* Delete data in db + files cascade */
// })
//
// /* Get vault files hierarchy (token: string, path: string = '/') */
// router.use('/:vaultToken/files', authMiddleware, filesRouter)

export default router