import React, { useCallback, useState } from 'react'
import Typography from '@material-ui/core/Typography'
import {
  buttonStyle,
  errorLabelStyle,
  sectionStyle,
  textBodyStyle,
} from '../styles'
import { FieldInput, fieldInputStyle, inputProps } from '../field-input'
import { Button, InputLabel, TextField } from '@mui/material'
import { useDebouncedCallback } from 'use-debounce'
import { DatePicker, LocalizationProvider } from '@mui/lab'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import { authHeader } from './services/auth'
import { REFRESH_MESSAGE } from '../constants'

export interface EndorsementCreateProps {
  authorization: string
  sourceId: string | null
  partyId: string | null
}

export const EndorsementCreate: React.FC<EndorsementCreateProps> = ({
  authorization,
  sourceId,
  partyId,
}) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [success, setSuccess] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const [name, setName] = useState<string | null>(null)
  const [link, setLink] = useState<string | null>(null)
  const [date, setDate] = useState<Date | null>(null)
  const [author, setAuthor] = useState<string | null>('Editorial')

  const onChangeName = useDebouncedCallback((e) => {
    const value = e.target.value
    setName(value && value.trim())
  })
  const onChangeLink = useDebouncedCallback((e) => {
    const value = e.target.value
    setLink(value && value.trim())
  })
  const onChangeDate = useDebouncedCallback((newDate) => {
    setDate(newDate)
  })
  const onChangeAuthor = useDebouncedCallback((e) => {
    const value = e.target.value
    setAuthor(value && value.trim())
  })

  const onCreateClick = useCallback(() => {
    const createNewSource = async () => {
      const response = await fetch('/api/endorsement', {
        method: 'POST',
        headers: {
          Authorization: authHeader(authorization),
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          name,
          link,
          date: date!.getTime(),
          author,
          sourceId,
          partyId,
        }),
      })

      if (response.ok) {
        setError(null)
        setSuccess(true)
      } else {
        if (response.status >= 500) {
          setError(REFRESH_MESSAGE)
        } else {
          const { messages } = await response.json()
          setError(messages.join(', '))
        }
        setSuccess(false)
      }
      setLoading(false)
    }

    if (name && link && date && author && sourceId && partyId) {
      setLoading(true)
      createNewSource()
    }
  }, [name, link, date, author, sourceId, partyId])

  const renderDateInput = useCallback(
    (params) => (
      <TextField
        {...params}
        style={fieldInputStyle}
        inputProps={{ ...inputProps, ...params.inputProps }}
        fullWidth
        disabled={loading}
        size="small"
        placeholder="Date of the endorsement"
        onChange={onChangeAuthor}
      />
    ),
    [loading, onChangeAuthor]
  )

  return (
    <div style={sectionStyle}>
      <Typography style={textBodyStyle}>
        Add a reference to the endorsement
        <br />
      </Typography>
      <br />
      <FieldInput
        onChange={onChangeName}
        disabled={loading}
        placeholder="Name of the endorsement"
      />
      <FieldInput
        onChange={onChangeLink}
        disabled={loading}
        placeholder="Link to the endorsement or reference"
      />
      <FieldInput
        onChange={onChangeAuthor}
        disabled={loading}
        defaultValue="Editorial"
        placeholder="Author of the endorsement (default Editorial)"
      />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          value={date}
          onChange={onChangeDate}
          renderInput={renderDateInput}
        />
      </LocalizationProvider>
      <Button
        disabled={!name || !link || !author || !date || !partyId || !sourceId}
        onClick={onCreateClick}
        style={buttonStyle}
        variant="outlined"
      >
        Create
      </Button>
      {!loading && error && (
        <InputLabel style={errorLabelStyle} error shrink>
          {error}
        </InputLabel>
      )}
      {!loading && success && (
        <InputLabel style={errorLabelStyle} color="success" shrink>
          Endorsement added!
        </InputLabel>
      )}
    </div>
  )
}
