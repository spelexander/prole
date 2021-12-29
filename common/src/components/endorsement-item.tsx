import React, { useMemo, CSSProperties, useCallback } from 'react'
import Typography from '@material-ui/core/Typography'
import { ColorSquare } from './color-square'
import Paper from '@material-ui/core/Paper'
import Skeleton from '@mui/material/Skeleton'
import type { Endorsement } from '@prole/model'
import { Level } from '@prole/model'
import { colors } from '../constants'

import './endorsement-item.css'
import { Avatar } from '@material-ui/core'

export interface EndorsementItemProps {
  selectEndorsement: (endorsement: Endorsement) => void
  endorsement: Endorsement
}

const container: CSSProperties = {
  display: 'flex',
  margin: '5px',
  cursor: 'pointer',
}
const textBox: CSSProperties = {
  marginLeft: '15px',
  marginTop: '5px',
}
const title: CSSProperties = {
  fontSize: '18px',
}
const description: CSSProperties = {
  fontSize: '11px',
}
const reference: CSSProperties = {
  marginLeft: 'auto',
  order: 2,
  marginRight: '20px',
  marginTop: '10px',
}
const referenceContent: CSSProperties = {
  fontSize: '12px',
  marginTop: '5px',
  marginBottom: '5px',
}

export const EndorsementItem: React.FC<EndorsementItemProps> = ({
  selectEndorsement,
  endorsement,
}) => {
  const { endorsee, level, references } = endorsement
  const { name, url } = endorsee

  const { referenceSummary, lastReferenceDate } = useMemo(() => {
    if (!references || references.length <= 0) {
      throw new Error('References must be provided.')
    }

    let referenceSummary = 'Multiple authors'

    const authors = new Set(references.map((ref) => ref.author))
    if (authors.size === 1) {
      ;[referenceSummary] = authors
    }

    return {
      referenceSummary,
      lastReferenceDate: references[references.length - 1],
    }
  }, [references])

  const onClick = useCallback(
    () => selectEndorsement(endorsement),
    [endorsement, selectEndorsement]
  )

  return (
    <Paper style={container} onClick={onClick} className="endorsement-item">
      {/* <Avatar */}
      {/*   variant="rounded" */}
      {/* /> */}
      <div style={textBox}>
        <Typography style={title} align="left" display="block">
          <a href={url} target="_blank" rel="noopener noreferrer">
            {name}
          </a>
        </Typography>
        <Typography style={description} align="left" display="block">
          {`${level} endorsement`}
        </Typography>
      </div>
      <div style={reference}>
        <Typography style={referenceContent} align="left" display="block">
          {new Date(lastReferenceDate.date).toDateString()}
          <br />
          {referenceSummary}
        </Typography>
      </div>
    </Paper>
  )
}

const skeletonStyle: CSSProperties = { marginTop: '10px', borderRadius: '2px' }

export const EndorsementItemSkeleton: React.FC = () => {
  return (
    <Paper style={container}>
      <ColorSquare color={colors.loading} level={Level.primary} />
      <div style={textBox}>
        <Skeleton
          animation="wave"
          style={skeletonStyle}
          variant="rectangular"
          width={150}
          height={12}
        />
        <Skeleton
          animation="wave"
          style={skeletonStyle}
          variant="rectangular"
          width={150}
          height={12}
        />
      </div>
    </Paper>
  )
}
