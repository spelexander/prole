import React, { useMemo, CSSProperties, useCallback } from 'react'
import Typography from '@material-ui/core/Typography'
import { ColorSquare } from './color-square'
import Paper from '@material-ui/core/Paper'
import Skeleton from '@mui/material/Skeleton'
import type { Endorsement } from '@prole/model'
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
  marginTop: '10px',
}
const title: CSSProperties = {
  fontSize: '18px',
  fontWeight: 100,
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
  whiteSpace: 'initial',
}

const imageStyle: CSSProperties = {
  width: '48px',
  height: '48px',
  margin: '5px',
}

export const EndorsementItem: React.FC<EndorsementItemProps> = ({
  selectEndorsement,
  endorsement,
}) => {
  const { party, references } = endorsement
  const { name, link, imageUrl } = party

  const yearsActive = useMemo(() => {
    const years = new Set(
      references
        .sort((a, b) => {
          if (a.date > b.date) {
            return 1
          } else if (a.date < b.date) {
            return -1
          } else {
            return 0
          }
        })
        .map((reference) => new Date(reference.date).getFullYear())
    )

    return [...years].join(', ')
  }, [references])

  const onClick = useCallback(
    () => selectEndorsement(endorsement),
    [endorsement, selectEndorsement]
  )

  const onLinkClick = useCallback((e) => e.stopPropagation(), [])

  return (
    <Paper style={container} onClick={onClick} className="endorsement-item">
      {imageUrl && (
        <Avatar style={imageStyle} variant="rounded" src={imageUrl} />
      )}
      <div style={textBox}>
        <Typography style={title} align="left" display="block">
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onLinkClick}
          >
            {name}
          </a>
        </Typography>
      </div>
      <div style={reference}>
        <Typography style={referenceContent} align="left" display="block">
          {yearsActive}
        </Typography>
      </div>
    </Paper>
  )
}

const skeletonStyle: CSSProperties = {
  marginTop: '10px',
  borderRadius: '2px',
}

const avatarSkeletonStyle: CSSProperties = {
  marginTop: '10px',
  borderRadius: '2px',
  margin: '5px',
}

export const EndorsementItemSkeleton: React.FC = () => {
  return (
    <Paper style={container}>
      <Skeleton
        style={avatarSkeletonStyle}
        animation="wave"
        variant="rectangular"
        width={48}
        height={48}
      />
      <div style={textBox}>
        <Skeleton
          animation="wave"
          style={skeletonStyle}
          variant="rectangular"
          width={190}
          height={15}
        />
      </div>
    </Paper>
  )
}
