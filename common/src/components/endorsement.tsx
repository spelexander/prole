import React, { useMemo } from 'react'
import Typography from '@material-ui/core/Typography'
import { ColorSquare } from './color-square'
import Paper from '@material-ui/core/Paper'
import { Endorsement, Id, Level } from '../types'
import Skeleton from '@mui/material/Skeleton'
import { makeStyles } from '@mui/styles'
import { colors } from '../constants'

export interface EndorsementItemProps {
  selectEndorsement: (endorsement: Endorsement) => void
  endorsement: Endorsement
}

const useStyles = makeStyles({
  container: { display: 'flex', margin: '5px' },
  textBox: {
    marginLeft: '15px',
    marginTop: '5px',
  },
  title: {
    fontSize: '18px',
  },
  description: {
    fontSize: '11px',
  },
  reference: {
    marginLeft: 'auto',
    order: 2,
    marginRight: '20px',
    marginTop: '10px',
  },
  referenceContent: {
    fontSize: '12px',
    marginTop: '5px',
    marginBottom: '5px',
  },
})

export const EndorsementItem: React.FC<EndorsementItemProps> = ({
  selectEndorsement,
  endorsement,
}) => {
  const styles = useStyles()

  const { endorsee, level, references } = endorsement
  const { name, url, color } = endorsee

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

  return (
    <Paper
      className={styles.container}
      onClick={() => selectEndorsement(endorsement)}
    >
      <ColorSquare color={color} level={level} />
      <div className={styles.textBox}>
        <Typography
          className={styles.title}
          align="left"
          variant="button"
          display="block"
        >
          <a href={url} target="_blank" rel="noopener noreferrer">
            {name}
          </a>
        </Typography>
        <Typography
          className={styles.description}
          align="left"
          variant="button"
          display="block"
        >
          {`${level} endorsement`}
        </Typography>
      </div>
      <div className={styles.reference}>
        <Typography
          className={styles.referenceContent}
          align="left"
          variant="button"
          display="block"
        >
          {`Last endorsed: ${new Date(lastReferenceDate.date).toDateString()}`}
          <br />
          {referenceSummary}
        </Typography>
      </div>
    </Paper>
  )
}

export const EndorsementItemSkeleton: React.FC = () => {
  const styles = useStyles()

  return (
    <Paper className={styles.container}>
      <ColorSquare color={colors.loading} level={Level.primary} />
      <div className={styles.textBox}>
        <Typography
          className={styles.title}
          align="left"
          variant="button"
          display="block"
        >
          <Skeleton variant="rectangular" width={150} height={15} />
        </Typography>
        <Typography
          className={styles.description}
          align="left"
          variant="button"
          display="block"
        >
          <Skeleton variant="rectangular" width={150} height={15} />
        </Typography>
      </div>
    </Paper>
  )
}
