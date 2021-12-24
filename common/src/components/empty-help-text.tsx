import React from 'react'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles({
  title: {
    fontSize: '20px',
    width: '100%',
    marginTop: '20px',
  },
  description: {
    fontSize: '11px',
    marginLeft: '30px',
    marginRight: '30px',
    marginTop: '20px',
  },
})

export const EmptyHelpText: React.FC = () => {
  const styles = useStyles()

  return (
    <>
      <Typography
        className={styles.title}
        align="center"
        variant="h6"
        display="block"
      >
        Prole found no endorsements
      </Typography>
      <Typography
        className={styles.description}
        align="center"
        variant="h6"
        display="block"
      >
        This doesn't mean there isn't any endorsements, just that Prole doesn't
        know about any.
      </Typography>
    </>
  )
}
