import React from 'react'
import Typography from '@material-ui/core/Typography'
import { Button } from '@mui/material'
import { buttonStyle } from '../styles'

export const Overview: React.FC = () => (
  <>
    <Typography
      style={{
        fontSize: '15',
        fontWeight: 100,
        textAlign: 'center',
      }}
    >
      <Button
        variant="outlined"
        style={buttonStyle}
        href={`${import.meta.env.VITE_APP_CHROME_EXTENSION_INSTALL_LOC}`}
      >
        Get Prole for Chrome
      </Button>
      <br />
      <br />
      Prole is a Chrome browser extension that checks for political endorsements
      🇦🇺
      <br />
      <br />
      Prole will tell you whether a news website has endorsed a political party
      during a recent Australian election.
      <br />
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
      Prole does not collect any data about you.
    </Typography>
  </>
)
