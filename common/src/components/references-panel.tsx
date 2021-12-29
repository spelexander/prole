import React, { useCallback } from 'react'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import CloseIcon from '@material-ui/icons/Close'
import { truncate } from '../utils'
import { Reference } from '@prole/model'

export interface ReferencesPanel {
  hideReferences: () => void
  references: Reference[]
}

const hideButton = {
  marginLeft: '10px',
}
const list = {
  marginTop: '10px',
}
const title = {
  marginLeft: '20px',
}

export const ReferencesPanel: React.FC<ReferencesPanel> = ({
  hideReferences,
  references,
}) => {
  const refToText = useCallback(
    (ref) => (
      <Typography style={title}>
        <a href={ref.url} target="_blank" rel="noopener noreferrer">
          {truncate(ref.title, 40)}
        </a>
        {' - '}
        {ref.author}
        {'   '}
        {ref.date}
        <br />
      </Typography>
    ),
    []
  )

  return (
    <>
      <Button style={hideButton} onClick={hideReferences}>
        <CloseIcon />
      </Button>
      <div style={list}>{references.map(refToText)}</div>
    </>
  )
}
