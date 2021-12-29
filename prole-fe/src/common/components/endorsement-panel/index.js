import React, { useState, useEffect } from 'react'
import Endorsement from '../endorsement'
import Typography from '@material-ui/core/Typography'
import ReferencesPanel from '../references-panel'

const EndorsementPanel = ({ loading, error, endorsements }) => {
  const [selectedEndorsement, setSelectedEndorsement] = useState(null)

  useEffect(() => {
    if (selectedEndorsement || loading) {
      setSelectedEndorsement(null)
    }
  }, [endorsements, loading, selectedEndorsement])

  if (error) {
    return (
      <Typography
        style={{ fontSize: '20px', width: '100%', marginTop: '20px' }}
        align="center"
        variant="h6"
      >
        Something has gone wrong, but we're on it.
      </Typography>
    )
  }

  if (loading) {
    return [1, 2].map(() => <Endorsement loading />)
  }

  if (selectedEndorsement) {
    return (
      <ReferencesPanel
        setSelectedEndorsement={setSelectedEndorsement}
        references={selectedEndorsement.references}
      />
    )
  }

  if (!loading && endorsements.length === 0) {
    return (
      <>
        <Typography
          style={{ fontSize: '20px', width: '100%', marginTop: '20px' }}
          align="center"
          variant="h6"
        >
          Prole found no endorsements
        </Typography>
        <Typography
          style={{
            fontSize: '11px',
            marginLeft: '30px',
            marginRight: '30px',
            marginTop: '20px',
          }}
          align="center"
          variant="h6"
        >
          This doesn't necessarily mean there isn't any endorsements, just that
          Prole doesn't know about any.
        </Typography>
      </>
    )
  }

  return (
    endorsements &&
    endorsements.map((endorsement) => (
      <Endorsement
        endorsement={endorsement}
        setSelectedEndorsement={setSelectedEndorsement}
      />
    ))
  )
}

export default EndorsementPanel
