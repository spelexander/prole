import React from 'react'
import Typography from '@material-ui/core/Typography'

export const Overview: React.FC = () => (
  <>
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
      through publication during a recent Australian election.
      <br />
      Prole is{' '}
      <a
        href="https://github.com/spelexander/prole"
        target="_blank"
        rel="noopener noreferrer"
      >
        open source.
      </a>
      <br />
      <br />
      Prole does not collect any data about you.
    </Typography>
  </>
)
