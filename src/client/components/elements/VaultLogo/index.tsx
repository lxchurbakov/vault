import React from 'react'
import styled from 'styled-components'

import lock from './lock.png'

const ImageBackground = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 46px;
  height: 46px;
  background: #40a9ff40;
  border-radius: 46px;

  cursor: pointer;
`

const LockImage = styled.img.attrs({
  src: lock
})`
  height: 26px;

  image-rendering: pixelated;
  image-rendering: -moz-crisp-edges;
  image-rendering: crisp-edges;
`

export default (props: any) => (
  <ImageBackground {...props}>
    <LockImage />
  </ImageBackground>
)