import React, { useCallback } from 'react'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import CloseIcon from '@material-ui/icons/Close'
import { Reference } from '../types'
import { truncate } from '../utils'
import { makeStyles } from '@mui/styles'

export interface ReferencesPanel {
  hideReferences: () => void
  references: Reference[]
}

const useStyles = makeStyles({
  hideButton: {
    marginLeft: '10px',
  },
  list: {
    marginTop: '10px',
  },
  title: {
    marginLeft: '20px',
  },
})

export const ReferencesPanel: React.FC<ReferencesPanel> = ({
  hideReferences,
  references,
}) => {
  const styles = useStyles()

  const refToText = useCallback(
    (ref) => (
      <Typography className={styles.title}>
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
      <Button className={styles.hideButton} onClick={hideReferences}>
        <CloseIcon />
      </Button>
      <div className={styles.list}>{references.map(refToText)}</div>
    </>
  )
}
