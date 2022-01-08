import React from 'react'
import { InlineEdit, ProleTitle } from '@prole/common'

export interface HeaderProps {
  domain: string | null
  homeLinkUrl: string
  setCurrentUrl: (url: string) => void
}

const proleLink = { textDecoration: 'none', marginLeft: '50px' }

const headerContainer = {
  display: 'flex',
  marginLeft: '10px',
  marginBottom: 0,
  marginTop: '10px',
}

export const Header: React.FC<HeaderProps> = ({
  domain,
  homeLinkUrl,
  setCurrentUrl,
}) => {
  return (
    <div style={headerContainer}>
      <InlineEdit
        initialValue={domain}
        onChanged={setCurrentUrl}
        startEdit={false}
      />
      <a style={proleLink} href={homeLinkUrl} target="_blank">
        <ProleTitle />
      </a>
    </div>
  )
}
