import React, { useCallback, useState } from 'react'
import { ProleTitle } from '@prole/common'
import ReactDOM from 'react-dom'

import '../index.css'
import { Feedback } from '@prole/model'
import {
  buttonStyle,
  errorLabelStyle,
  sectionStyle,
  textBodyStyle,
} from '../styles'
import Typography from '@material-ui/core/Typography'
import { FieldInput } from '../field-input'
import { Button, InputLabel } from '@mui/material'
import { useDebouncedCallback } from 'use-debounce'
import { REFRESH_MESSAGE } from '../constants'

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

const HelpPage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [success, setSuccess] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const [feedback, setFeedback] = useState<string | null>(null)
  const [subject, setSubject] = useState<string | null>(null)
  const [email, setEmail] = useState<string | null>(null)

  const onChangeFeedback = useDebouncedCallback((e) => {
    const value = e.target.value
    setFeedback(value && value.trim())
  })

  const onChangeSubject = useDebouncedCallback((e) => {
    const value = e.target.value
    setSubject(value && value.trim())
  })

  const onChangeEmail = useDebouncedCallback((e) => {
    const value = e.target.value
    setEmail(value && value.trim())
  })

  const onCreateClick = useCallback(() => {
    const createNewSource = async () => {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          feedback,
          subject,
          email,
        } as Feedback),
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

    if (feedback) {
      setLoading(true)
      createNewSource()
    }
  }, [feedback, subject, email])

  return (
    <div style={wrapperStyle}>
      <div style={innerStyle}>
        <ProleTitle size={60} weight={100} />
        <div style={containerStyle}>
          <div style={sectionStyle}>
            <Typography style={textBodyStyle}>
              Please provide your feedback below
              <br />
            </Typography>
            <br />
            <div>
              <FieldInput
                onChange={onChangeFeedback}
                disabled={loading}
                multiline
                minRows={6}
                placeholder="Report incorrect information, request an improvement or general feedback"
              />
              <FieldInput
                onChange={onChangeSubject}
                disabled={loading}
                placeholder="Relevant news source or party (optional)"
              />
              <FieldInput
                onChange={onChangeEmail}
                disabled={loading}
                placeholder="Your email address (optional)"
              />
              <Button
                disabled={!feedback}
                onClick={onCreateClick}
                style={buttonStyle}
                variant="outlined"
              >
                Create
              </Button>
            </div>
            {!loading && error && (
              <InputLabel style={errorLabelStyle} error shrink>
                {error}
              </InputLabel>
            )}
            {!loading && success && (
              <InputLabel style={errorLabelStyle} color="success" shrink>
                Feedback received! Thank you
              </InputLabel>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <HelpPage />
  </React.StrictMode>,
  document.getElementById('root')
)
