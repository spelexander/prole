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
  width?: string
}

export const InlineEdit: React.FC<InlineEditProps> = ({
  initialValue,
  onChanged,
  startEdit,
  width,
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

  const editStyle: CSSProperties = useMemo(
    () => ({
      ...(width ? { width } : {}),
      flexGrow: 1,
      fontSize: '16px',
    }),
    [width]
  )

  const displayStyle: CSSProperties = useMemo(
    () => ({
      ...buttonStyle,
      marginBottom: '4px',
      marginLeft: '6px',
      ...(width ? { width } : {}),
    }),
    [buttonStyle, width]
  )

  if (editing) {
    return (
      <TextField
        style={editStyle}
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
