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
        <div
          style={{
            marginTop: '150px',
            width: '400px',
          }}
        >
          <Try />
          <Divider style={{ margin: '20px' }} />
          <Overview />
          <Divider style={{ margin: '20px' }} />
          <Data />
        </div>
      </div>
    </div>
  )
}

export default App
