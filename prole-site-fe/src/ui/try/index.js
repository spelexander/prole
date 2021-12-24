import React, { useEffect, useState } from 'react'
import EndorsementPanel from '../../common-build/components/endorsement-panel'
import Divider from '@material-ui/core/Divider'
import InlineEdit from '../../common-build/components/inline-edit'
import Typography from '@material-ui/core/Typography'

const style = {
  margin: '10px',
}

function Try() {
  const [url, setUrl] = useState(null)
  const [endorsements, setEndorsements] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (url) {
          const newEndorsements = await fetch('prole', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ hostname: url }),
          }).then((res) => res.json())
          setEndorsements(newEndorsements)
          setLoading(false)
        }
      } catch (e) {
        setError(e)
      }
    }
    fetchData()
  }, [url])

  return (
    <>
      <Typography
        style={{
          fontSize: '15',
          fontWeight: 100,
          textAlign: 'center',
          marginLeft: '10px',
        }}
        variant="body"
      >
        Enter a company domain below (e.g. example.com)
        <br />
        <br />
      </Typography>
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

export default Try
