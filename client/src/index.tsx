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

fetch(`http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/health`).then(console.log).catch(console.error)

// console.log(`${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/health`)

// '': JSON.stringify(process.env.SERVER_HOST),
// 'process.env.SERVER_PORT': JSON.stringify(process.env.SERVER_PORT),