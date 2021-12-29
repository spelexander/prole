import React from 'react'
import Typography from '@material-ui/core/Typography'

export const Overview: React.FC = () => (
  <>
    <Typography style={{ fontSize: '20', fontWeight: 100 }} variant="h6">
      What is Prole?
      <br />
    </Typography>
    <Typography
      style={{
        fontSize: '15',
        fontWeight: 100,
        textAlign: 'center',
        marginTop: '30px',
      }}
    >
      Prole is a{' '}
      <a href={`${import.meta.env.VITE_APP_CHROME_EXTENSION_INSTALL_LOC}`}>
        Chrome browser extension
      </a>{' '}
      that checks for political endorsements 🇦🇺
      <br />
      <br />
      Prole will tell you whether a news website has endorsed a political party
      through publication or donation during a recent Australian election.
      <br />
    </Typography>
  </>
)
