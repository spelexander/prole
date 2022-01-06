import React from 'react'
import Typography from '@material-ui/core/Typography'

const title = {
  fontSize: '20px',
  fontWeight: 100,
  width: '100%',
  marginTop: '20px',
}
const description = {
  fontSize: '11px',
  fontWeight: 100,
  marginLeft: '30px',
  marginRight: '30px',
  marginTop: '20px',
}

export const EmptyHelpText: React.FC = () => {
  return (
    <>
      <Typography style={title} align="center" variant="h6" display="block">
        Prole found no endorsements
      </Typography>
      <Typography
        style={description}
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
