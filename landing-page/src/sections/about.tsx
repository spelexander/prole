import React from 'react'
import Typography from '@material-ui/core/Typography'

export const About: React.FC = () => {
  return (
    <>
      <Typography
        style={{
          fontSize: '15',
          fontWeight: 100,
          textAlign: 'center',
          marginTop: '30px',
        }}
      >
        Prole seeks to help readers understand unseen political bias in their
        content by displaying publicly available information about the authoring
        entity.
        <br />
        <br />
        For instance Prole can reveal if a news source endorsed an Australian
        political party during the last election.
        <br />
        <br />
        Or, if a company is a registered donor for a political party.
      </Typography>
    </>
  )
}
