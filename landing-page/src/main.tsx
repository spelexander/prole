import React from 'react'
import ReactDOM from 'react-dom'
import { ProleTitle } from '@prole/common'
import { Overview } from './sections/overview'
import { Try } from './sections/try'

import './index.css'

const wrapperStyle = {
  justifyContent: 'center',
  width: '100%',
  display: 'flex',
}

const containerStyle = {
  marginTop: '150px',
  maxWidth: '500px',
  minWidth: '400px',
}

const innerStyle = {
  marginTop: '20vh',
  marginBottom: '20vh',
}

const MainPage: React.FC = () => (
  <div style={wrapperStyle}>
    <div style={innerStyle}>
      <ProleTitle size={60} weight={100} />
      <div style={containerStyle}>
        <Try />
        <Overview />
      </div>
    </div>
  </div>
)

ReactDOM.render(
  <React.StrictMode>
    <MainPage />
  </React.StrictMode>,
  document.getElementById('root')
)
