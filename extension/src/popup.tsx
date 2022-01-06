import React, { CSSProperties, useEffect, useState } from 'react'
import Divider from '@material-ui/core/Divider'
import { EndorsementPanel, getHostName } from '@prole/common/src'
import { Endorsement } from '@prole/model'
import { Header } from './header'
import { Controls } from './controls'

const popupStyle: CSSProperties = {
  width: '500px',
  height: '400px',
}

const dividerStyle: CSSProperties = {
  margin: '5px',
}

export const Popup = () => {
  const [url, setUrl] = useState<string | null>(null)
  const [endorsements, setEndorsements] = useState<{ Id: Endorsement } | null>(
    null
  )

  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
      const [{ url }] = tabs
      setUrl(url ? getHostName(url) : null)
    })
  }, [])

  useEffect(() => {
    let aborted = false

    const fetchData = async () => {
      if (aborted) {
        return
      }

      if (url) {
        setLoading(true)
        try {
          const newEndorsements = await fetch(
            `${import.meta.env.VITE_APP_SERVER_URL}/prole`,
            {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ hostname: url }),
            }
          ).then((res) => res.json())
          setEndorsements(newEndorsements)
          setLoading(false)
        } catch (e) {
          console.error(e)
          setError('Unknown client error')
        }
      }
    }
    fetchData()

    return () => {
      aborted = true
    }
  }, [url])

  return (
    <div style={popupStyle}>
      <Header
        url={url}
        setCurrentUrl={setUrl}
        homeLinkUrl={`${import.meta.env.VITE_APP_HOME_URL}`}
      />
      <Divider style={dividerStyle} />
      <EndorsementPanel
        error={error}
        endorsements={endorsements}
        loading={loading}
      />
      <Controls helpUrl={`${import.meta.env.VITE_APP_HELP_URL}`} />
    </div>
  )
}
