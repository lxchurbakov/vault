import { observable, action } from 'mobx'

import api from '@/libs/api'
import storage from '@/libs/storage'

import { CachedVault } from '../types'

const VAULTS_KEY = 'available-vaults'

/**
 * The Dashboard store. Here is the information about available vaults stored.
 */
export class DashboardStore {
  /**
   * Create Vault Modal state
   */
  @observable createVaultModal = { visible: false, loading: false, error: null }

  @action setCreateVaultModal = (createVaultModal) => {
    this.createVaultModal = { ...this.createVaultModal, ...createVaultModal }
  }

  /**
   * Create Vault API call
   */
  @action createVault = ({ name, password}) => {
    this.setCreateVaultModal({ loading: true })

    api.createVault(name, password).then(({ data }) => {
      /* Add this vault to available vaults */
      this.setVaults(this.vaults.concat([{ name, token: data.token }]))
    }).catch((error) => {
      this.setCreateVaultModal({ error })
    }).then(() => {
      this.setCreateVaultModal({ loading: false })
    })
  }

  /**
   * List of vaults user has recently logged in to
   */
  @observable vaults: CachedVault[] = []

  @action setVaults = (vaults: CachedVault[]) => {
    this.vaults = vaults
    this.saveVaultsToStorage()
  }

  @action saveVaultsToStorage = () => {
    storage.set(VAULTS_KEY, this.vaults)
  }

  @action loadVaultsFromStorage = () => {
    storage.get<CachedVault[]>(VAULTS_KEY).then((vaults) => {
      this.vaults = vaults || []
    })
  }

  constructor () {
    /* Load vaults on startup */
    this.loadVaultsFromStorage()
  }
}

export default new DashboardStore();
