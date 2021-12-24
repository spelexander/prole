import React, { useEffect, useState } from 'react'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { getHostName } from '../../utils'

const style = {
  textTransform: 'none',
  alignContext: 'center',
}

const InlineEdit = ({ initialValue, onChanged, width, startEdit }) => {
  const [editing, setEditing] = useState(startEdit)
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    if (initialValue !== value) {
      if (initialValue) {
        setValue(initialValue)
      }
    }
  }, [initialValue])

  const getTextField = (defaultValue) => (
    <TextField
      style={{ ...style, width }}
      variant="outlined"
      onKeyDown={(e) => {
        let newValue = e.target.value
        if (!newValue.startsWith('http')) {
          newValue = `https://${newValue}`
        }
        newValue = getHostName(newValue)

        if (e.key === 'Enter' && newValue) {
          setValue(newValue)
          onChanged(newValue)
          setEditing(false)
        }
      }}
      margin="dense"
      defaultValue={defaultValue}
    />
  )

  if (editing) {
    return getTextField(value)
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
  width: '380px',
  startEdit: false,
}

export default InlineEdit
