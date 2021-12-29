import React from 'react'
import Typography from '@material-ui/core/Typography'

export const Data: React.FC = () => (
  <>
    <Typography style={{ fontSize: '20', fontWeight: 100 }} variant="h6">
      Prole is open source
    </Typography>
    <Typography
      style={{
        fontSize: '15',
        fontWeight: 100,
        textAlign: 'center',
        marginTop: '30px',
      }}
    >
      You can find the source code for Prole{' '}
      <a
        href="https://github.com/spelexander/prole"
        target="_blank"
        rel="noopener noreferrer"
      >
        on Github
      </a>
      <br />
      You will be able to{' '}
      <a
        href={`${import.meta.env.VITE_APP_DATA_DOWNLOAD_LOCATION}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        download the data for Prole here
      </a>{' '}
      soon.
      <br />
      <br />
      Prole does not collect any data about you.
    </Typography>
  </>
)
