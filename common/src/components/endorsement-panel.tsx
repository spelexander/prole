import React, { useState, useCallback } from 'react'
import { Endorsement } from '../types'
import Typography from '@material-ui/core/Typography'
import { ReferencesPanel } from './references-panel'
import { EndorsementItem, EndorsementItemSkeleton } from './endorsement'
import { EmptyHelpText } from './empty-help-text'
import { makeStyles } from '@mui/styles'

export interface EndorsementPanelProps {
  loading: boolean
  error: string | null
  endorsements: { Id: Endorsement } | null
}

const useStyles = makeStyles({
  errorMessage: {
    fontSize: '20px',
    width: '100%',
    marginTop: '20px',
  },
})

export const EndorsementPanel: React.FC<EndorsementPanelProps> = ({
  loading,
  error,
  endorsements,
}) => {
  const styles = useStyles()

  const [selectedEndorsement, setSelectedEndorsement] =
    useState<Endorsement | null>(null)

  const hideReferences = useCallback(() => {
    setSelectedEndorsement(null)
  }, [])

  if (loading) {
    return (
      <>
        {Array(2).map(() => (
          <EndorsementItemSkeleton />
        ))}
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
      <Typography
        className={styles.errorMessage}
        align="center"
        variant="h6"
        display="block"
      >
        Something's gone wrong, try refreshing.
      </Typography>
    )
  }

  if (Object.keys(endorsements).length === 0) {
    return <EmptyHelpText />
  }

  return (
    <>
      {Object.values(endorsements).map((endorsement) => (
        <EndorsementItem
          endorsement={endorsement}
          selectEndorsement={setSelectedEndorsement}
        />
      ))}
    </>
  )
}
