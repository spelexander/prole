import { makeStyles } from '@mui/styles'
import React from 'react'
import { Level } from '../types'

export interface ColourSquareProps {
  color: string
  level: Level
}

const useStyles = makeStyles({
  roundedButton: {
    borderRadius: '5px',
  },
  primary: {
    width: '48px',
    height: '48px',
    margin: '10px',
  },
  secondary: {
    width: '22px',
    height: '22px',
    margin: '22px',
  },
})

export const ColorSquare: React.FC<ColourSquareProps> = ({ color, level }) => {
  const styles = useStyles()

  return (
    <div
      className={`${styles.roundedButton} ${
        level === 'primary' ? styles.primary : styles.secondary
      }`}
      style={{ backgroundColor: color }}
    />
  )
}

ColorSquare.defaultProps = {
  color: '#ebebeb',
}
