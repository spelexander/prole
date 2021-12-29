import React, { useState, useCallback } from 'react'
import Typography from '@material-ui/core/Typography'
import { ReferencesPanel } from './references-panel'
import { EndorsementItem, EndorsementItemSkeleton } from './endorsement-item'
import { EmptyHelpText } from './empty-help-text'
import { Endorsement } from '@prole/model'

export interface EndorsementPanelProps {
  loading: boolean
  error: string | null
  endorsements: { Id: Endorsement } | null
}

const errorContent = { fontSize: '20px', width: '100%', marginTop: '20px' }

const errorContainer = { marginTop: '10px' }

export const EndorsementPanel: React.FC<EndorsementPanelProps> = ({
  loading,
  error,
  endorsements,
}) => {
  const [selectedEndorsement, setSelectedEndorsement] =
    useState<Endorsement | null>(null)

  const hideReferences = useCallback(() => {
    setSelectedEndorsement(null)
  }, [])

  if (loading) {
    return (
      <>
        <EndorsementItemSkeleton />
        <EndorsementItemSkeleton />
      </>
    )
  }

  if (selectedEndorsement) {
    return (
      <ReferencesPanel
        hideReferences={hideReferences}
        references={selectedEndorsement.references}
      />
    )
  }

  if (error || endorsements === null) {
    return (
      <Typography style={errorContent} align="center" variant="h6">
        Something's gone wrong, try refreshing.
      </Typography>
    )
  }

  if (Object.keys(endorsements).length === 0) {
    return <EmptyHelpText />
  }

  return (
    <div style={errorContainer}>
      {Object.values(endorsements).map((endorsement) => (
        <EndorsementItem
          endorsement={endorsement}
          selectEndorsement={setSelectedEndorsement}
        />
      ))}
    </div>
  )
}
