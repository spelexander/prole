import React, { useCallback, useMemo } from 'react'
import Button from '@material-ui/core/Button'
import CloseIcon from '@material-ui/icons/Close'
import { truncate } from '../utils'
import { Reference } from '@prole/model'
import {
  Timeline,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
  TimelineDot,
  TimelineConnector,
  TimelineContent,
} from '@mui/lab'
import { Typography } from '@mui/material'

export interface ReferencesPanel {
  hideReferences: () => void
  references: Reference[]
}

const hideButton = {
  marginLeft: '10px',
}

const style = {
  fontWeight: 100,
}

export const ReferencesPanel: React.FC<ReferencesPanel> = ({
  hideReferences,
  references,
}) => {
  const sortedReferences = useMemo(
    () =>
      references.sort((a, b) => {
        if (a.date > b.date) {
          return -1
        } else if (a.date < b.date) {
          return 1
        } else {
          return 0
        }
      }),
    [references]
  )

  const refToText = useCallback(
    (reference) => (
      <TimelineItem key={reference.id}>
        <TimelineOppositeContent style={style} color="text.secondary">
          {`${new Date(reference.date).toDateString()}`}
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent style={style}>
          <a href={reference.link} target="_blank" rel="noopener noreferrer">
            {truncate(reference.name, 40)}
          </a>
        </TimelineContent>
      </TimelineItem>
    ),
    []
  )

  return (
    <>
      <Button style={hideButton} onClick={hideReferences}>
        <CloseIcon />
      </Button>
      <Timeline>{sortedReferences.map(refToText)}</Timeline>
    </>
  )
}
