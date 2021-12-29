import React, {
  useCallback,
  useEffect,
  useState,
  useMemo,
  CSSProperties,
} from 'react'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { getHostName } from '../utils'

const editStyle: CSSProperties = {
  flexGrow: 1,
  fontSize: '16px',
}

const buttonStyle: CSSProperties = {
  textTransform: 'none',
  flexGrow: 1,
  fontSize: '16px',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  maxHeight: '45px',
  marginTop: '5px',
}

export interface InlineEditProps {
  initialValue: string | null
  onChanged: (value: string) => void
  startEdit?: boolean
}

export const InlineEdit: React.FC<InlineEditProps> = ({
  initialValue,
  onChanged,
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

  const startEditing = useCallback(() => {
    setEditing(true)
  }, [])

  const onBlur = useCallback(() => {
    setEditing(false)
  }, [])

  const displayStyle: CSSProperties = useMemo(
    () => ({ ...buttonStyle, marginBottom: '4px', marginLeft: '6px' }),
    [buttonStyle]
  )

  if (editing) {
    return (
      <TextField
        style={editStyle}
        onBlur={onBlur}
        variant="outlined"
        onKeyDown={onKeyDown}
        margin="dense"
        defaultValue={value}
      />
    )
  }

  return (
    <Button style={buttonStyle} onClick={startEditing}>
      <Typography style={displayStyle} align="left" display="block">
        {value}
      </Typography>
    </Button>
  )
}

InlineEdit.defaultProps = {
  startEdit: false,
}
