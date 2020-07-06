import { observable, action } from 'mobx'
import api from '@/libs/api'

const parseJson = <T>(data: string) => new Promise<T>((resolve, reject) => {
  try {
    resolve(JSON.parse(data))
  } catch (e) {
    reject(e)
  }
})

export type CachedVault = {
  name: string
  token: string // login token for that vault
}

/**
 * The Dashboard store. Here is the information about available vaults stored.
 *
 */
export class DashboardStore {
  @observable createVaultModal = { visible: false, loading: false, error: null }
  @action setCreateVaultModal = (createVaultModal) => {
    this.createVaultModal = { ...this.createVaultModal, ...createVaultModal }
  }

  @action createVault = ({ name, password}) => {
    this.setCreateVaultModal({ loading: true })
    api.createVault(name, password).then(({ data }) => {
      /* Add this token to available vaults */
      this.setAvailableVaults(this.availableVaults.concat([{ name, token: data.token }]))
    }).catch((error) => {
      this.setCreateVaultModal({ error })
    }).then(() => {
      this.setCreateVaultModal({ loading: false })
    })
  }

  @observable availableVaults: CachedVault[] = []
  @action setAvailableVaults = (vaults: CachedVault[]) => {
    this.availableVaults = vaults
    localStorage.setItem('available-vaults', JSON.stringify(vaults))
  }

  constructor () {
    /* Load available vaults from store */
    parseJson<CachedVault[]>(localStorage.getItem('available-vaults')).then((availableVaults) => {
      this.availableVaults = availableVaults || []
    })
  }
}

export default new DashboardStore();
