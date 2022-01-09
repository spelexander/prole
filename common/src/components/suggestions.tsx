import React, { CSSProperties, useCallback } from 'react'
import { Source } from '@prole/model'
import { List, ListItem, ListItemButton, ListItemText } from '@mui/material'

export interface SuggestionsProps {
  sources: Source[] | null
  selectSource: (source: Source) => void
}

export const textBodyStyle: CSSProperties = {
  fontSize: '16',
  fontWeight: 100,
}

export const Suggestions: React.FC<SuggestionsProps> = ({
  sources,
  selectSource,
}) => {
  const getOnClick = useCallback(
    (source: Source) => () => selectSource(source),
    [selectSource]
  )

  const listItem = useCallback(
    (source: Source) => (
      <ListItem disablePadding>
        <ListItemButton onClick={getOnClick(source)}>
          <ListItemText
            primaryTypographyProps={{ style: textBodyStyle }}
            secondaryTypographyProps={{ style: textBodyStyle }}
            style={textBodyStyle}
            primary={source.name}
            secondary={source.domain}
          />
        </ListItemButton>
      </ListItem>
    ),
    []
  )

  if (!sources) {
    return null
  }

  return <List>{sources.map(listItem)}</List>
}
