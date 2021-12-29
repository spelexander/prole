import React, { useMemo } from 'react'

import './prole-title.css'
import Typography from '@material-ui/core/Typography'

export interface ProleTitleProps {
  size?: number
  weight?: number
}

export const ProleTitle: React.FC<ProleTitleProps> = (props) => {
  const proleTitleStyle = useMemo(
    () => ({
      fontSize: `${props.size}px`,
      fontWeight: props.weight,
      color: 'black',
      marginTop: '30px',
      marginRight: '25px',
      marginLeft: 'auto',
      marginBottom: 0,
    }),
    [props.size, props.weight]
  )

  return (
    <Typography
      style={proleTitleStyle}
      className={`text-pop-up-top`}
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
