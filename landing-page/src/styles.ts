import { CSSProperties } from 'react'
import { colors } from '@prole/common'

export const panelStyle: CSSProperties = {
  borderRadius: '5px',
  border: `1px solid ${colors.loading}`,
  padding: '20px',
}

export const textBodyStyle: CSSProperties = {
  fontSize: '16',
  fontWeight: 100,
}

export const errorLabelStyle: CSSProperties = {
  fontWeight: 100,
  marginTop: '5px',
}

export const buttonStyle: CSSProperties = {
  fontSize: '16px',
  fontWeight: 100,
  textTransform: 'none',
}

export const sectionStyle: CSSProperties = {
  ...panelStyle,
  marginBottom: '20px',
}

export const wrapperStyle = {
  justifyContent: 'center',
  width: '100%',
  display: 'flex',
}

export const containerStyle = {
  marginTop: '150px',
  maxWidth: '500px',
  minWidth: '400px',
}

export const innerStyle = {
  marginTop: '20vh',
  marginBottom: '20vh',
}
