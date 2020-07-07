import React from 'react'
import styled from 'styled-components'

import { Button } from 'antd'

import { CachedVault, AnyComponentProps } from '../../types'

const VaultWrap = styled.div`
  border-radius: 12px;
  background: #673ab7;
  padding: 20px;
`

const VaultName = styled.div`
  color: white;
  font-weight: bold;
  margin-bottom: 20px;
  font-size: 24px;
`

const VaultControls = styled.div`

`

type Props = {
  vault: CachedVault
}

export default class VaultCard extends React.PureComponent<Props & AnyComponentProps> {
  render () {
    const { vault, ...props } = this.props

    return (
      <VaultWrap {...props}>
        <VaultName>{vault.name}</VaultName>
        <VaultControls>
          <Button>Enter</Button>
        </VaultControls>
      </VaultWrap>
    )
  }
}