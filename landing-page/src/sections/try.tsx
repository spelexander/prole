import React, {
  CSSProperties,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import Typography from '@material-ui/core/Typography'
import {
  colors,
  EndorsementPanel,
  InlineEdit,
  useEndorsements,
} from '@prole/common'
import { Endorsement, EndorsementResponse } from '@prole/model'
import { Button } from '@mui/material'
import { panelStyle } from '../styles'

const tryPromptInfoStyle: CSSProperties = {
  fontSize: '16',
  fontWeight: 100,
}

const tryPromptStyle: CSSProperties = {
  fontSize: '16',
  fontWeight: 300,
}

const tryPanelStyle: CSSProperties = {
  ...panelStyle,
  marginBottom: '50px',
}

const exampleButtonStyle: CSSProperties = {
  padding: '0px',
  textTransform: 'none',
  backgroundColor: colors.loading,
  color: 'black',
}

/**
 * Example news sources that can be used for data. to be DB later
 */
const promptNewsSources = [
  'theaustralian.com.au',
  'smh.com.au',
  'theguardian.com',
  'theage.com.au',
]

export const Try: React.FC = () => {
  const [promptIndex, setPromptIndex] = useState<number>(
    Math.floor(Math.random() * (promptNewsSources.length - 1))
  )
  const [domain, setDomain] = useState<string | null>(null)
  const { loading, endorsements, error } = useEndorsements(domain)

  // Change the suggested news source every 10 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      const newIndex = promptIndex + 1
      setPromptIndex(newIndex === promptNewsSources.length ? 0 : newIndex)
    }, 10000)

    return () => clearInterval(timer)
  })

  const promptNewsSource = useMemo(
    () => promptNewsSources[promptIndex],
    [promptNewsSources, promptIndex]
  )

  const onClickExample = useCallback(
    () => setDomain(promptNewsSource),
    [promptNewsSource]
  )

  return (
    <div style={tryPanelStyle}>
      <Typography style={tryPromptInfoStyle}>
        Enter a news company domain below
        <br />
        (like {'  '}
        <Button style={exampleButtonStyle} onClick={onClickExample}>
          <Typography style={tryPromptStyle}>{promptNewsSource}</Typography>
        </Button>
        )
      </Typography>
      <br />
      <InlineEdit
        width="100%"
        startEdit
        initialValue={domain}
        onChanged={setDomain}
      />
      <EndorsementPanel
        error={error}
        endorsements={endorsements}
        loading={loading}
      />
    </div>
  )
}
