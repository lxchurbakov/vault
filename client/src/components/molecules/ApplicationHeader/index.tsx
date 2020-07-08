import React from 'react'
import styled from 'styled-components'

import VaultLogo from '@/components/elements/VaultLogo'

const WhiteBackground = styled.div`
  display: flex;
  background: white;
  width: 100%;
  height: 60px;
  box-shadow: 0 0 4px 2px rgba(0, 0, 0, .1);
  display: flex;
  align-items: center;
  justify-content: center;
`

const ContentWrap = styled.div`
  max-width: 1080px;
  height: 100%;
  display: flex;
  align-items: center;
  position: relative;
`

export default () => {
  return (
    <WhiteBackground>
      <ContentWrap>
        <VaultLogo />
      </ContentWrap>
    </WhiteBackground>
  )
}