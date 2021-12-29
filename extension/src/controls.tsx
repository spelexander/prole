import React, { CSSProperties } from 'react'
import Typography from '@material-ui/core/Typography'

export interface ControlsProps {
  helpUrl: string
}

const info: CSSProperties = {
  marginLeft: 'auto',
  order: 2,
  marginRight: '20px',
  marginTop: '20px',
  fontSize: '12px',
}
const container: CSSProperties = {
  display: 'flex',
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  marginBottom: '10px',
}

export const Controls: React.FC<ControlsProps> = ({ helpUrl }) => {
  return (
    <div style={container}>
      <Typography style={info} align="left" display="block">
        Something not right?{' '}
        <a href={helpUrl} target="_blank" rel="noopener noreferrer">
          Let us know
        </a>
      </Typography>
    </div>
  )
}
