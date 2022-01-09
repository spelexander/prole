import React, { useCallback, useState, useMemo, useRef } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import { Suggestions } from './suggestions'
import { Popover } from '@mui/material'
import { Source } from '@prole/model'
import { fetchData } from './fetch-source-suggestions'
import { InlineEdit } from './inline-edit'

export interface DomainEntryProps {
  initialValue: string | null
  onChanged: (value: string) => void
  startEdit?: boolean
  width?: string
  baseUrl?: string
}

export const DomainEntry: React.FC<DomainEntryProps> = ({
  initialValue,
  onChanged,
  startEdit,
  width,
  baseUrl,
}) => {
  const ref = useRef()
  const [isEditing, setIsEditing] = useState(startEdit)
  const [suggestionsOpen, setSuggestionsOpen] = useState(false)
  const [suggestions, setSuggestions] = useState<Source[] | null>(null)
  const [mouseOverPopup, setMouseOverPopup] = useState<boolean>()

  const closeSearch = useCallback(() => {
    setSuggestionsOpen(false)
  }, [])

  const showSuggestions = useMemo(
    () => Boolean(suggestionsOpen && suggestions?.length && isEditing),
    [suggestions, suggestionsOpen, isEditing]
  )

  const selectSuggestion = useCallback(({ domain }: Source) => {
    onChanged(domain)
    setSuggestionsOpen(false)
  }, [])

  const onChange = useDebouncedCallback((term) => {
    if (!term) {
      return
    }

    fetchData(term, baseUrl).then((result) => {
      if (result.data && isEditing) {
        setSuggestions(result.data)
        setSuggestionsOpen(true)
      }
    })
  }, 200)

  const onInputBlur = useCallback(() => {
    if (!mouseOverPopup) {
      setSuggestionsOpen(false)
    }
  }, [mouseOverPopup])

  const disableBlur = useCallback(() => {
    setMouseOverPopup(true)
  }, [])

  const enableBlur = useCallback(() => {
    setMouseOverPopup(false)
  }, [])

  const onStopEdit = useCallback(() => {
    setIsEditing(false)
    setSuggestions(null)
  }, [])

  const onStartEdit = useCallback(() => {
    setIsEditing(true)
  }, [])

  return (
    <>
      <Popover
        style={{
          pointerEvents: 'none',
        }}
        PaperProps={{
          style: {
            pointerEvents: 'auto',
            overflow: 'auto',
            width: (ref.current as Element | void)?.clientWidth,
            maxHeight: '200px',
          },
        }}
        elevation={3}
        transitionDuration={0}
        disableAutoFocus
        disableEnforceFocus
        open={showSuggestions}
        anchorEl={ref.current}
        onClose={closeSearch}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <div
          style={{ overflow: 'auto' }}
          onMouseOver={disableBlur}
          onMouseOut={enableBlur}
        >
          <Suggestions sources={suggestions} selectSource={selectSuggestion} />
        </div>
      </Popover>
      <InlineEdit
        anchor={ref}
        initialValue={initialValue}
        onChanged={onChanged}
        onInput={onChange}
        width={width}
        startEdit={startEdit}
        onInputBlur={onInputBlur}
        onStopEdit={onStopEdit}
        onStartEdit={onStartEdit}
      />
    </>
  )
}

DomainEntry.defaultProps = {
  baseUrl: '',
}
