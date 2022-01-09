import React, { ChangeEvent } from 'react'

import { TextField } from '@mui/material'
import { CSSProperties } from '@material-ui/core/styles/withStyles'
import { textBodyStyle } from './styles'

export const inputProps = {
  style: textBodyStyle,
}

export interface FieldInputProps {
  disabled: boolean
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  defaultValue?: string
  multiline?: boolean
  minRows?: number
}

export const fieldInputStyle: CSSProperties = {
  marginBottom: '10px',
}

export const FieldInput: React.FC<FieldInputProps> = ({
  disabled,
  placeholder,
  onChange,
  defaultValue,
  multiline,
  minRows,
}) => {
  return (
    <TextField
      style={fieldInputStyle}
      inputProps={inputProps}
      fullWidth
      disabled={disabled}
      size="small"
      placeholder={placeholder}
      onChange={onChange}
      defaultValue={defaultValue}
      multiline={multiline}
      minRows={minRows}
    />
  )
}
