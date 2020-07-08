import './index.html'
import 'antd/dist/antd.css'

import * as ReactDOM from 'react-dom'
import * as React from 'react'

import MasterPage from './domains/MasterPage'

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root')

  ReactDOM.render(<MasterPage />, root)
})