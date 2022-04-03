import React from 'react'
import {
  withStyles,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core'
import { HomeOutlined } from '@material-ui/icons'
import DoNotDisturbOnIcon from '@mui/icons-material/DoNotDisturbOn'
import styled from 'styled-components'
import { COLORS } from '../../constants/colors'

function SideProgressBar() {
  const [selectedIndex, setSelectedIndex] = React.useState(0)

  const handleListItemClick = (index: number) => {
    setSelectedIndex(index)
  }

  const ProgressItem = (text: string, index: number) => {
    const textStyling = {
      fontSize: '16px',
      color: index === selectedIndex ? 'black' : COLORS.TEXT_GREY,
    }
    return (
      <ListItem
        button
        selected={selectedIndex === index}
        onClick={() => handleListItemClick(index)}
      >
        <ListItemIcon>
          {index == 0 ? (
            <HomeOutlined style={{ color: COLORS.EDLAW_BLUE }} />
          ) : (
            <DoNotDisturbOnIcon style={{ color: COLORS.EDLAW_BLUE }} />
          )}
        </ListItemIcon>
        <ListItemText
          primaryTypographyProps={{ style: textStyling }}
          primary={text}
        />
      </ListItem>
    )
  }

  return (
    <>
      {ProgressItem('Home', 0)}
      {ProgressItem('Contact Info', 1)}
      {ProgressItem('Additional Info', 2)}
      {ProgressItem('District and School', 3)}
      {ProgressItem('Student or Group Details', 4)}
      {ProgressItem('Concerns', 5)}
    </>
  )
}

export default SideProgressBar
