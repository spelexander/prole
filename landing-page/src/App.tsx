import React from 'react'
import { ProleTitle } from '@prole/common'
import { Overview } from './sections/overview'
import { Data } from './sections/data'
import { Try } from './sections/try'
import Divider from '@material-ui/core/Divider'

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

const divider = { margin: '20px' }

function App() {
  return (
    <div style={wrapperStyle}>
      <div
        style={{
          marginTop: '20vh',
          marginBottom: '20vh',
        }}
      >
        <ProleTitle size={60} weight={100} />
        <div style={containerStyle}>
          <Try />
          <Overview />
          {/* <Divider style={divider} /> */}
          {/* <Data /> */}
        </div>
      </div>
    </div>
  )
}

export default App
