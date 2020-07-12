import * as ReactDOM from 'react-dom'
import * as React from 'react'

import 'antd/dist/antd.css'

import SignInPage from './domains/auth/pages/SignInPage'
import MainPage from './domains/main/pages/MainPage'

document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app')

  if (!!app) {
    ReactDOM.render(<SignInPage />, app)
  }
})