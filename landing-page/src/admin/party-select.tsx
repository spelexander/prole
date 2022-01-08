import React, { CSSProperties, useCallback, useEffect, useState } from 'react'
import { errorLabelStyle, panelStyle, textBodyStyle } from '../styles'
import Typography from '@material-ui/core/Typography'
import { InputLabel, MenuItem, Select } from '@mui/material'
import { Id, Party } from '@prole/model'
import { NO_CONTACT_MESSAGE } from '../constants'

export interface PartySelect {
  setPartyId: (id: Id) => void
}

const sectionStyle: CSSProperties = {
  ...panelStyle,
  marginBottom: '20px',
}

export const PartySelect: React.FC<PartySelect> = ({ setPartyId }) => {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [parties, setParties] = useState<Party[] | null>(null)

  const onChange = useCallback((event) => {
    setPartyId(event.target.value)
  }, [])

  useEffect(() => {
    let aborted = false

    const fetchParties = async () => {
      const response = await fetch('/api/party/all')
      if (response.ok) {
        const parties = await response.json()
        setParties(parties)
      } else {
        setError(NO_CONTACT_MESSAGE)
      }
      setLoading(false)
    }
    fetchParties()

    return () => {
      aborted = true
    }
  }, [])

  return (
    <div style={sectionStyle}>
      <Typography style={textBodyStyle}>
        Select the party or individual which was endorsed
        <br />
      </Typography>
      <br />
      <Select
        fullWidth
        disabled={loading}
        size="small"
        defaultValue={''}
        onChange={onChange}
      >
        {parties &&
          parties.map((party) => (
            <MenuItem key={party.id} value={party.id}>
              {party.name}
            </MenuItem>
          ))}
      </Select>
      {error && (
        <InputLabel style={errorLabelStyle} error shrink>
          {error}
        </InputLabel>
      )}
    </div>
  )
}
