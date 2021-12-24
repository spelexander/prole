import React, { useCallback, useEffect, useState } from 'react'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { getHostName } from '../utils'

export interface InlineEditProps {
  initialValue: string
  onChanged: (value: string) => void
  width: number
  startEdit: boolean
}

const style = {
  textTransform: 'none',
  alignContext: 'center',
}

export const InlineEdit: React.FC<InlineEditProps> = ({
  initialValue,
  onChanged,
  width,
  startEdit,
}) => {
  const [editing, setEditing] = useState(startEdit)
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    if (initialValue !== value) {
      if (initialValue) {
        setValue(initialValue)
      }
    }
  }, [initialValue])

  const onKeyDown = useCallback((e) => {
    let newValue = e.target.value

    newValue = getHostName(newValue)

    if (e.key === 'Enter' && newValue) {
      setValue(newValue)
      onChanged(newValue)
      setEditing(false)
    }
  }, [])

  if (editing) {
    return (
      <TextField
        style={{ ...style, width: `${width}px` }}
        variant="outlined"
        onKeyDown={onKeyDown}
        margin="dense"
        defaultValue={value}
      />
    )
  }

  return (
    <Button
      style={{ ...style, width }}
      onClick={() => {
        setEditing(true)
      }}
    >
      <Typography
        style={{ alignContext: 'center', fontSize: '16px' }}
        align="left"
        variant="h3"
        display="block"
      >
        {value}
      </Typography>
    </Button>
  )
}

InlineEdit.defaultProps = {
  width: 380,
  startEdit: false,
}
