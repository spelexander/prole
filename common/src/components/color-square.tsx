import React, { useMemo } from 'react'

export interface ColourSquareProps {
  color: string
  size?: 'small' | 'large'
}

const roundedButton = {
  borderRadius: '5px',
}
const large = {
  width: '48px',
  height: '48px',
}

const small = {
  width: '22px',
  height: '22px',
}

export const ColorSquare: React.FC<ColourSquareProps> = ({ color, size }) => {
  const style = useMemo(
    () =>
      size === 'large'
        ? {
            backgroundColor: color,
            ...roundedButton,
            ...large,
          }
        : {
            backgroundColor: color,
            ...roundedButton,
            small,
          },
    [size, color]
  )

  return <div style={style} />
}

ColorSquare.defaultProps = {
  size: 'large',
}
