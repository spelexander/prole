import React, { CSSProperties, useCallback, useEffect, useState } from 'react'
import {
  buttonStyle,
  errorLabelStyle,
  panelStyle,
  sectionStyle,
  textBodyStyle,
} from '../styles'
import Typography from '@material-ui/core/Typography'
import { Button, InputLabel, MenuItem, Select } from '@mui/material'
import { Id, Source } from '@prole/model'
import { NO_CONTACT_MESSAGE, REFRESH_MESSAGE } from '../constants'
import { FieldInput } from '../field-input'
import { useDebouncedCallback } from 'use-debounce'
import { authHeader } from './services/auth'

export interface PartySelect {
  authorization: string
  setSourceId: (id: Id) => void
}

const growStyle: CSSProperties = {
  flexGrow: 1,
}

const containerStyle: CSSProperties = { display: 'flex' }

const orTextStyle: CSSProperties = {
  ...textBodyStyle,
  marginTop: '10px',
  marginLeft: '20px',
  marginRight: '20px',
}

const backButtonStyle: CSSProperties = {
  ...buttonStyle,
  marginLeft: '10px',
}

export const SourceSelect: React.FC<PartySelect> = ({
  setSourceId,
  authorization,
}) => {
  // source selection fetching state
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [sources, setSources] = useState<Source[] | null>(null)

  // select state
  const onChange = useCallback((event) => {
    setSourceId(event.target.value)
  }, [])

  // when creating a new source this is the state we need
  const [createMode, setCreateMode] = useState<boolean>(false)
  const [name, setName] = useState<string | null>(null)
  const [link, setLink] = useState<string | null>(null)
  const [domain, setDomain] = useState<string | null>(null)

  useEffect(() => {
    let aborted = false

    const fetchSources = async () => {
      const response = await fetch('/api/source/all')
      if (response.ok) {
        const parties = await response.json()
        setSources(parties)
      } else {
        setError(NO_CONTACT_MESSAGE)
      }
      setLoading(false)
    }
    fetchSources()

    return () => {
      aborted = true
    }
  }, [])

  const onNewClick = useCallback(() => {
    setCreateMode(true)
  }, [])

  const onChangeName = useDebouncedCallback((e) => {
    setName(e.target.value)
  })

  const onChangeLink = useDebouncedCallback((e) => {
    setLink(e.target.value)
  })

  const onChangeDomain = useDebouncedCallback((e) => {
    setDomain(e.target.value)
  })

  const onCreateClick = useCallback(() => {
    const createNewSource = async () => {
      const response = await fetch('/api/source', {
        method: 'POST',
        headers: {
          Authorization: authHeader(authorization),
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          domain,
          link,
          name,
        }),
      })

      if (response.ok) {
        const { id } = await response.json()
        setSources([
          ...(sources || []),
          {
            id,
            name,
            domain,
            link,
          } as Source,
        ])
        setCreateMode(false)
      } else {
        if (response.status >= 500) {
          setError(REFRESH_MESSAGE)
        } else {
          const { messages } = await response.json()
          setError(messages.join(', '))
        }
      }
      setLoading(false)
    }

    if (name && domain && link) {
      setLoading(true)
      createNewSource()
    }
  }, [sources, name, domain, link, authorization])

  const onBackClick = useCallback(() => {
    setCreateMode(false)
  }, [])

  return (
    <div style={sectionStyle}>
      <Typography style={textBodyStyle}>
        Select the data source which made the endorsement
        <br />
      </Typography>
      <br />
      <div style={containerStyle}>
        {createMode ? (
          <div>
            <FieldInput
              onChange={onChangeName}
              disabled={loading}
              placeholder="Organisation name"
            />
            <FieldInput
              onChange={onChangeDomain}
              disabled={loading}
              placeholder="Domain name (like google.com.au)"
            />
            <FieldInput
              onChange={onChangeLink}
              disabled={loading}
              placeholder="Full link to organisations website"
            />
            <Button
              disabled={!name || !link || !domain || loading}
              onClick={onCreateClick}
              style={buttonStyle}
              variant="outlined"
            >
              Create
            </Button>
            <Button
              disabled={loading}
              onClick={onBackClick}
              style={backButtonStyle}
            >
              Back
            </Button>
          </div>
        ) : (
          <>
            <Select
              style={growStyle}
              disabled={loading}
              size="small"
              onChange={onChange}
              defaultValue={''}
            >
              {sources &&
                sources.map(({ id, name }) => (
                  <MenuItem key={id} value={id}>
                    {name}
                  </MenuItem>
                ))}
            </Select>
            <Typography style={orTextStyle}>OR</Typography>
            <Button onClick={onNewClick} style={buttonStyle} variant="outlined">
              New source
            </Button>
          </>
        )}
      </div>
      {error && (
        <InputLabel style={errorLabelStyle} error shrink>
          {error}
        </InputLabel>
      )}
    </div>
  )
}
