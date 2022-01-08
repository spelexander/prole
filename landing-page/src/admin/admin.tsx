import React, { useState } from 'react'
import { ProleTitle } from '@prole/common'
import ReactDOM from 'react-dom'

import '../index.css'
import { TokenInput } from './token-input'
import { EndorsementCreate } from './endorsement-create'
import { PartySelect } from './party-select'
import { SourceSelect } from './source-select'
import { Id } from '@prole/model'

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

const AdminPage: React.FC = () => {
  const [authorization, setAuthorization] = useState<string>('')

  const [partyId, setPartyId] = useState<null | Id>(null)
  const [sourceId, setSourceId] = useState<null | Id>(null)

  return (
    <div style={wrapperStyle}>
      <div style={innerStyle}>
        <ProleTitle size={60} weight={100} />
        <div style={containerStyle}>
          {authorization ? (
            <div>
              <PartySelect setPartyId={setPartyId} />
              <SourceSelect
                authorization={authorization}
                setSourceId={setSourceId}
              />
              <EndorsementCreate
                authorization={authorization}
                sourceId={sourceId}
                partyId={partyId}
              />
            </div>
          ) : (
            <TokenInput setAuthorization={setAuthorization} />
          )}
        </div>
      </div>
    </div>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <AdminPage />
  </React.StrictMode>,
  document.getElementById('root')
)
