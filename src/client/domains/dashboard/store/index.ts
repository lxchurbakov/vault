import { observable, action } from 'mobx'

export class DashbaordStore {
  @observable createVaultModal = { visible: false, loading: false, error: null }
  @action setCreateVaultModal = (createVaultModal) => {
    this.createVaultModal = { ...this.createVaultModal, ...createVaultModal }
  }

  @action createVault = ({ name, password}) => {
    /* API call */
    /* If ok store the token somewhere and show modal all ok */
  }
}

export default new DashbaordStore();
