import React from 'react'
import Box from '@material-ui/core/Box'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import { withStyles } from '@material-ui/core'
import { HomeOutlined } from '@material-ui/icons'
import DoNotDisturbOnIcon from '@mui/icons-material/DoNotDisturbOn'

const StyledListItemIcon = withStyles(
  {
    root: {
      minWidth: '40px',
    },
  },
  { name: 'StyledListItemIcon' }
)(ListItemIcon)

const StyledListItemText = withStyles(
  {
    root: {
      fontSize: '20px',
    },
  },
  { name: 'StyledListItemText' }
)(ListItemText)

const StyledListItem = withStyles(
  {
    root: {
      '&.Mui-selected': {
        background:
          'linear-gradient(to right, #5064C7 0%, #5064C7 2%, #FFFFFF 2%, #FFFFFF 100%)',
        boxShadow: '0px 1px 8px rgba(0, 0, 0, 0.15)',
      },
      '&:hover': {
        // repetitive send help
        background:
          'linear-gradient(to right, #5064C7 0%, #5064C7 2%, #FFFFFF 2%, #FFFFFF 100%)',
        boxShadow: '0px 1px 8px rgba(0, 0, 0, 0.15)',
      },
    },
  },
  { name: 'ListItem' }
)(ListItem)

function SideProgressBar() {
  const [selectedIndex, setSelectedIndex] = React.useState(0)

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement>,
    index: number
  ) => {
    setSelectedIndex(index)
  }

  const ProgressItem = (text: string, index: number) => {
    return (
      <StyledListItem
        button
        selected={selectedIndex === index}
        onClick={(event) => handleListItemClick(event, index)}
      >
        <StyledListItemIcon>
          <DoNotDisturbOnIcon
            style={{
              color: `${selectedIndex === index ? '#5064C7' : '#E2E2E2'}`,
            }}
          />
        </StyledListItemIcon>
        <StyledListItemText primary={text} />
      </StyledListItem>
    )
  }

  return (
    <Box
      position="relative"
      top="5%"
      left="10%"
      borderColor="#B8B8B8"
      borderRadius={3}
      sx={{ width: '80%', bgcolor: 'white' }}
    >
      <List dense={true}>
        <StyledListItem
          button
          selected={selectedIndex === 0}
          onClick={(event) => handleListItemClick(event, 0)}
        >
          <StyledListItemIcon>
            <HomeOutlined />
          </StyledListItemIcon>
          <StyledListItemText primary="Home" />
        </StyledListItem>
        {ProgressItem('Contact Info', 1)}
        {ProgressItem('Additional Info', 2)}
        {ProgressItem('District and School', 3)}
        {ProgressItem('Student or Group Details', 4)}
        {ProgressItem('Concerns', 5)}
      </List>
    </Box>
  )
}

export default SideProgressBar
