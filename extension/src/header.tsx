import React from 'react'
import { InlineEdit, ProleTitle } from '@prole/common'

export interface HeaderProps {
  url: string | null
  homeLinkUrl: string
  setCurrentUrl: (url: string) => void
}

const proleLink = { textDecoration: 'none', marginLeft: '50px' }

const headerContainer = {
  display: 'flex',
  marginLeft: '10px',
  marginBottom: 0,
}

export const Header: React.FC<HeaderProps> = ({
  url,
  homeLinkUrl,
  setCurrentUrl,
}) => {
  return (
    <div style={headerContainer}>
      <InlineEdit
        initialValue={url}
        onChanged={setCurrentUrl}
        startEdit={false}
      />
      <a style={proleLink} href={homeLinkUrl} target="_blank">
        <ProleTitle />
      </a>
    </div>
  )
}
