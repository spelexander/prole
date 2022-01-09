import React, {
  useCallback,
  useEffect,
  useState,
  useMemo,
  CSSProperties,
  Ref,
  MutableRefObject,
  FocusEvent,
} from 'react'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { parseHostName, isValidDomainName } from '../utils'
import { useDebouncedCallback } from 'use-debounce'

export interface InlineEditProps {
  initialValue: string | null
  onChanged: (value: string) => void
  onInput: (value: string) => void
  startEdit?: boolean
  width?: string
  anchor?: MutableRefObject<Element | void>
  onInputBlur?: (e: FocusEvent<HTMLInputElement>) => void
  onStopEdit?: () => void
  onStartEdit?: () => void
}

export const InlineEdit: React.FC<InlineEditProps> = ({
  initialValue,
  onChanged,
  onInput,
  startEdit,
  width,
  anchor,
  onInputBlur,
  onStopEdit,
  onStartEdit,
}) => {
  const [editing, setEditing] = useState(startEdit)
  const [value, setValue] = useState(initialValue)
  const [valid, setValid] = useState<boolean>(true)

  useEffect(() => {
    if (initialValue !== value) {
      if (initialValue) {
        setValue(initialValue)

        if (initialValue) {
          setEditing(false)
          setValid(isValidDomainName(initialValue))
        }
      }
    }
  }, [initialValue])

  const onKeyDown = useDebouncedCallback((e) => {
    let newValue = e.target.value

    newValue = parseHostName(newValue)
    if (e.key === 'Enter' && newValue && isValidDomainName(newValue)) {
      setValue(newValue)
      onChanged(newValue)
      setEditing(false)
      onStopEdit && onStopEdit()
    }
  })

  const onChange = useDebouncedCallback((e) => {
    let newValue = e.target.value
    onInput(newValue)

    const hostName = parseHostName(newValue)
    setValid(Boolean(hostName && isValidDomainName(hostName)))
  })

  const startEditing = useCallback(() => {
    setEditing(true)
    onStartEdit && onStartEdit()
  }, [])

  const editStyle: CSSProperties = useMemo(
    () => ({
      ...(width ? { width } : {}),
      flexGrow: 1,
      fontSize: '16px',
      fontWeight: 100,
    }),
    [width]
  )

  const buttonStyle: CSSProperties = useMemo(
    () => ({
      ...(width ? { width } : {}),
      textTransform: 'none',
      flexGrow: 1,
      fontSize: '16px',
      fontWeight: 100,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      maxHeight: '45px',
      marginTop: '5px',
      marginBottom: '2px',
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
        innerRef={anchor}
        inputProps={{ style: editStyle }}
        fullWidth
        autoFocus
        error={!valid}
        style={editStyle}
        onBlur={onInputBlur}
        variant="outlined"
        onKeyDown={onKeyDown}
        onChange={onChange}
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
