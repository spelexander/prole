import React, { useMemo } from 'react'
import { Level } from '@prole/model'

export interface ColourSquareProps {
  color: string
  level: Level
}

const roundedButton = {
  borderRadius: '5px',
}
const primary = {
  width: '48px',
  height: '48px',
  margin: '10px',
}
const secondary = {
  width: '22px',
  height: '22px',
  margin: '22px',
}

export const ColorSquare: React.FC<ColourSquareProps> = ({ color, level }) => {
  const style = useMemo(
    () =>
      level === Level.primary
        ? {
            backgroundColor: color,
            ...roundedButton,
            ...primary,
          }
        : {
            backgroundColor: color,
            ...roundedButton,
            secondary,
          },
    [level, color]
  )

  return <div style={style} />
}
