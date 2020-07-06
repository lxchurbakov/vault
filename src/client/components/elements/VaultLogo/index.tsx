import React from 'react'
import styled from 'styled-components'

import lock from './lock.png'

const ImageBackground = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 46px;
  height: 46px;
  background: #ffc10740;
  border-radius: 46px;

  cursor: pointer;
  transition: background 100ms ease;

  &:hover {
    background: #ffc10780;
  }
`

const LockImage = styled.img.attrs({
  src: lock
})`
  height: 26px;

  image-rendering: pixelated;
  image-rendering: -moz-crisp-edges;
  image-rendering: crisp-edges;

  transform: translateY(0);
  transition: transform 100ms ease;

  &:hover {
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`

export default (props: any) => (
  <ImageBackground {...props}>
    <LockImage />
  </ImageBackground>
)