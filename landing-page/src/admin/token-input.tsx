import React, { CSSProperties, useCallback, useEffect, useState } from 'react'
import {
  Button,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Skeleton,
} from '@mui/material'
import Typography from '@material-ui/core/Typography'
import {
  buttonStyle,
  errorLabelStyle,
  panelStyle,
  textBodyStyle,
} from '../styles'
import { validateToken } from './services/auth'

const validateButtonStyle: CSSProperties = {
  ...buttonStyle,
  padding: 0,
  paddingLeft: '5px',
  paddingRight: '5px',
  marginRight: '-10px',
}

const loadingBarStyle: CSSProperties = { marginTop: '-10px' }

export interface TokenInputProps {
  setAuthorization: (isAdmin: string) => void
}

const INVALID_TOKEN_MESSAGE = 'invalid token provided'

export const TokenInput: React.FC<TokenInputProps> = ({ setAuthorization }) => {
  // for token loaded from local storage
  const [loadingCache, setLoadingCache] = useState<boolean>(true)
  const [storedToken, setStoredToken] = useState<string | null>(null)

  // for token entered into the field
  const [value, setValue] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const onClick = useCallback(() => {
    if (value) {
      onInput(value)
    }
  }, [value])

  const onChange = useCallback((e) => {
    const inputValue = e.target.value
    setValue(inputValue && inputValue.trim())
  }, [])

  const onInput = useCallback((token: string) => {
    setLoading(true)
    setError(null)

    const useToken = async () => {
      const isValid = await validateToken(token)

      if (isValid) {
        await localStorage.setItem('token', token)
        setLoading(false)
        setError(null)
        setAuthorization(token)
      } else {
        setLoading(false)
        setError(INVALID_TOKEN_MESSAGE)
      }
    }
    useToken()
  }, [])

  useEffect(() => {
    let aborted = false

    const loadStoredToken = async () => {
      if (aborted) {
        return
      }

      const token = await localStorage.getItem('token')

      if (token) {
        const isValid = await validateToken(token)
        setStoredToken(token)
        setValue(token)
        setLoadingCache(false)
        setError(isValid ? null : INVALID_TOKEN_MESSAGE)
      } else {
        setLoadingCache(false)
        setError(null)
      }
    }
    loadStoredToken()

    return () => {
      aborted = true
    }
  }, [])

  return (
    <div style={panelStyle}>
      <Typography style={textBodyStyle}>
        Paste your access token below to begin
        <br />
      </Typography>
      <br />
      {loadingCache ? (
        <Skeleton style={loadingBarStyle} height={60} />
      ) : (
        <OutlinedInput
          style={textBodyStyle}
          onChange={onChange}
          autoFocus={!Boolean(storedToken)}
          fullWidth
          size="small"
          disabled={loading}
          error={Boolean(error)}
          defaultValue={storedToken}
          endAdornment={
            <InputAdornment position="end">
              <Button
                autoFocus={Boolean(storedToken)}
                variant="outlined"
                disabled={Boolean(!value)}
                style={validateButtonStyle}
                onClick={onClick}
              >
                start
              </Button>
            </InputAdornment>
          }
        />
      )}
      {error && (
        <InputLabel style={errorLabelStyle} error shrink>
          {error}
        </InputLabel>
      )}
    </div>
  )
}
