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
import { CUTOFFS } from '../../constants/responsive'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import useWindowDimensions from '../../hooks/widthHook'
const GreySideBox = styled.div`
  width: 30%;
  min-width: 200px;
  max-width: 300px;
  background-color: ${COLORS.LIGHT_GREY};
  height: 100%;
  border-right: 1px solid ${COLORS.SHADOW_GREY};
  @media (max-width: 320px) {
    width: 100%;
    min-width: auto;
    max-width: 100%;
    height: auto;
  }
`
function SideProgressBar() {
  const [selectedIndex, setSelectedIndex] = React.useState(0)

  const width = useWindowDimensions().width

  const handleListItemClick = (index: number) => {
    setSelectedIndex(index)
  }

  const [expanded, setExpanded] = React.useState(false)

  const onChange = (event: React.SyntheticEvent, navExpand: boolean) => {
    if (width <= CUTOFFS.mobile) {
      setExpanded(!navExpand)
    } else {
      setExpanded(true)
    }
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

  const NAVITEMS = [
    'Home',
    'Contact Info',
    'District and School',
    'Student or Group Details',
    'Concerns',
  ]
  return (
    <Accordion onChange={onChange} expanded={expanded}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        {ProgressItem(NAVITEMS[selectedIndex], selectedIndex)}
      </AccordionSummary>

      <AccordionDetails>
        <GreySideBox>
          {NAVITEMS.map((text, index) => ProgressItem(text, index))}
        </GreySideBox>
      </AccordionDetails>
    </Accordion>
  )
}

export default SideProgressBar
