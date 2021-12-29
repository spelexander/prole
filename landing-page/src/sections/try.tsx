import React, { useEffect, useState } from 'react'
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'
import { EndorsementPanel, InlineEdit } from '@prole/common'
import { Endorsement } from '@prole/model'

const style = {
  margin: '10px',
}

export const Try: React.FC = () => {
  const [url, setUrl] = useState<string | null>(null)
  const [endorsements, setEndorsements] = useState<{ Id: Endorsement } | null>(
    null
  )
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let aborted = false

    const fetchData = async () => {
      if (aborted) {
        return
      }

      try {
        if (url) {
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
        }
      } catch (e) {
        setError('Unable to fetch endorsements.')
      }
    }
    fetchData()

    return () => {
      aborted = true
    }
  }, [url])

  return (
    <>
      <Typography
        style={{
          fontSize: '16',
          fontWeight: 100,
        }}
      >
        Enter a news company domain below <br />
        (e.g. theaustralian.com.au)
      </Typography>
      <br />
      <InlineEdit
        width="100%"
        startEdit
        initialValue={url}
        onChanged={setUrl}
      />
      <Divider style={style} />
      <EndorsementPanel
        error={error}
        endorsements={endorsements}
        loading={loading}
      />
    </>
  )
}
