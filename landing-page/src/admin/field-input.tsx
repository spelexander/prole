import React, { ChangeEvent } from 'react'

import { textBodyStyle } from '../styles'
import { TextField } from '@mui/material'
import { CSSProperties } from '@material-ui/core/styles/withStyles'

export const inputProps = {
  style: textBodyStyle,
}

export interface FieldInputProps {
  disabled: boolean
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  defaultValue?: string
}

export const fieldInputStyle: CSSProperties = {
  marginBottom: '10px',
}

export const FieldInput: React.FC<FieldInputProps> = ({
  disabled,
  placeholder,
  onChange,
  defaultValue,
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
    />
  )
}
