import React, { CSSProperties } from 'react'
import { ProleTitle } from '@prole/common'
import ReactDOM from 'react-dom'

import '../index.css'

import { Typography } from '@mui/material'
import { containerStyle, innerStyle, wrapperStyle } from '../styles'

const itemStyle: CSSProperties = {
  fontWeight: 100,
}

const headingStyle: CSSProperties = {
  fontWeight: 100,
  fontSize: '35px',
}

const Policy: React.FC = () => {
  return (
    <div style={wrapperStyle}>
      <div style={innerStyle}>
        <ProleTitle size={60} weight={100} />
        <div style={containerStyle}>
          <Typography style={headingStyle} variant="h1">
            Privacy Policy
          </Typography>
          <p>
            <ul>
              <li style={itemStyle}>
                Prole does not store any data about you.
              </li>
              <li style={itemStyle}>Prole does not use cookies.</li>
            </ul>
          </p>
        </div>
      </div>
    </div>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <Policy />
  </React.StrictMode>,
  document.getElementById('root')
)
