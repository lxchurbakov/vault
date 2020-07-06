import React from 'react'
import { Breadcrumb, Button, Typography, Modal } from 'antd'
import { toJS } from 'mobx'
import { observer, inject } from 'mobx-react'

import ContentContainer from '@/components/elements/ContentContainer'
import ContentSection from '@/components/elements/ContentSection'

import CreateVaultModal from '../../components/CreateVaultModal'

import dashboardStore from '../../store'

type Props = {
  dashboardStore?: typeof dashboardStore
};

@inject('dashboardStore') @observer
export default class AvailableVaults extends React.PureComponent<Props> {
  showCreateVaultModal = () =>
    this.props.dashboardStore.setCreateVaultModal({ visible: true })

  hideCreateVaultModal = () =>
    this.props.dashboardStore.setCreateVaultModal({ visible: false })

  createVaultModal = (data) =>
    this.props.dashboardStore.createVault(data)

  render () {
    const createVaultModalVisible = this.props.dashboardStore.createVaultModal.visible
    const availableVaults = toJS(this.props.dashboardStore.availableVaults)

    return (
      <ContentContainer style={{ paddingTop: 24 }}>
        <Breadcrumb>
          <Breadcrumb.Item>
            <a href="#">Dashboard</a>
          </Breadcrumb.Item>
        </Breadcrumb>

        <ContentSection
          style={{ marginTop: 36 }}
          title="Available Vaults"
          right={<Button onClick={this.showCreateVaultModal}>Create</Button>}
        >
          {availableVaults.length === 0 && (
            <Typography.Text disabled>No Vaults Available</Typography.Text>
          )}

          {availableVaults.map((vault) => (
            <div>
              {vault.name}: {vault.token}
            </div>
          ))}
        </ContentSection>

        <CreateVaultModal
          onSubmit={this.createVaultModal}
          visible={createVaultModalVisible}
          onCancel={this.hideCreateVaultModal}
        />
      </ContentContainer>
    )
  }
}