import React from 'react'

import './prole-title.css'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@mui/styles'

export interface ProleTitleProps {
  size: number
  weight: number
}

const useStyles = makeStyles({
  proleTitle: ({ size, weight }: ProleTitleProps) => ({
    color: 'black',
    marginTop: '30px',
    marginRight: '25px',
    marginLeft: 'auto',
    fontSize: size,
    fontWeight: weight,
  }),
})

export const ProleTitle: React.FC<ProleTitleProps> = (props) => {
  const styles = useStyles(props)
  return (
    <Typography
      className={`text-pop-up-top ${styles.proleTitle}`}
      variant="h1"
      display="block"
    >
      Prole.
    </Typography>
  )
}

ProleTitle.defaultProps = {
  size: 24,
  weight: 100,
}
