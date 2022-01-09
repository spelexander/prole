import React, { CSSProperties, useEffect, useState } from 'react'
import {
  EndorsementPanel,
  isValidDomainName,
  parseHostName,
  useEndorsements,
} from '@prole/common'
import { Header } from './header'
import { Controls } from './controls'

const popupStyle: CSSProperties = {
  width: '500px',
  height: '400px',
}

export const Popup = () => {
  const [domain, setDomain] = useState<string | null>(null)
  const { loading, endorsements, error } = useEndorsements(
    domain,
    `${import.meta.env.VITE_APP_SERVER_URL}`
  )

  useEffect(() => {
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
      const [{ url }] = tabs
      if (!url) {
        return
      }

      const tabDomainName = parseHostName(url)
      if (!tabDomainName) {
        return
      }

      if (isValidDomainName(tabDomainName)) {
        setDomain(tabDomainName)
      }
    })
  }, [])

  return (
    <div style={popupStyle}>
      <Header
        domain={domain}
        setCurrentUrl={setDomain}
        homeLinkUrl={`${import.meta.env.VITE_APP_HOME_URL}`}
      />
      <EndorsementPanel
        error={error}
        endorsements={endorsements}
        loading={loading}
      />
      <Controls helpUrl={`${import.meta.env.VITE_APP_HELP_URL}`} />
    </div>
  )
}
