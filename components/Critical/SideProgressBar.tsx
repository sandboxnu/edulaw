import React, { useEffect } from 'react'
import { ListItemIcon, ListItemText } from '@material-ui/core'
import styled from 'styled-components'
import { HomeOutlined } from '@material-ui/icons'
import DoNotDisturbOnIcon from '@mui/icons-material/DoNotDisturbOn'
import { COLORS } from '../../constants/colors'
import { CUTOFFS } from '../../constants/responsive'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import useWindowDimensions from '../../hooks/widthHook'

const GreySideBox = styled.div`
  width: 100%;
  background-color: ${COLORS.LIGHT_GREY};
  height: 100%;
  border-right: 1px solid ${COLORS.SHADOW_GREY};
  @media (max-width: ${CUTOFFS.mobile}px) {
    width: 100%;
    min-width: auto;
    max-width: 100%;
    height: auto;
  }
`
const ListItem = styled.div`
  display: flex;
  flex-direction: row;
  height: 48px;
  width: auto;
  padding: 8px;
  &:hover {
    width: 100%;
    border-radius: 8px;
    background-color: ${COLORS.EDLAW_BLUE}1A;
  }
`

const SummaryItem = styled.div`
  display: flex;
  flex-direction: row;
  height: 48px;
  width: 100%;
  padding: 8px;
  border-radius: 8px;
  background-color: ${COLORS.EDLAW_BLUE}1A;
  }
`

function SideProgressBar() {
  const [selectedIndex, setSelectedIndex] = React.useState(0)

  const width = useWindowDimensions().width

  const [expanded, setExpanded] = React.useState(width >= CUTOFFS.mobile)
  const handleListItemClick = (index: number) => {
    setSelectedIndex(index)
    if (width <= CUTOFFS.mobile) {
      setExpanded(false)
    }
  }

  const onChange = (event: React.SyntheticEvent, navExpand: boolean) => {
    // If on mobile layout
    if (width <= CUTOFFS.mobile) {
      setExpanded(navExpand)
    } else {
      // desktop layout
      setExpanded(true)
    }
  }

  useEffect(() => {
    if (width >= CUTOFFS.mobile) {
      setExpanded(true)
    }
  }, [width])

  const ProgressItem = (text: string, index: number) => {
    const textStyling = {
      fontSize: '16px',
      color: index === selectedIndex ? 'black' : COLORS.TEXT_GREY,
    }

    if (selectedIndex == index) {
      return (
        <SummaryItem key={text}>
          <ListItemIcon style={{ display: 'flex', alignItems: 'center' }}>
            {index == 0 ? (
              <HomeOutlined style={{ color: COLORS.EDLAW_BLUE }} />
            ) : (
              <DoNotDisturbOnIcon style={{ color: COLORS.EDLAW_BLUE }} />
            )}
          </ListItemIcon>
          <ListItemText
            style={{ display: 'flex', alignItems: 'center', fontSize: '16px' }}
            primaryTypographyProps={{ style: textStyling }}
            primary={text}
          />
        </SummaryItem>
      )
    } else {
      return (
        <ListItem key={text} onClick={() => handleListItemClick(index)}>
          <ListItemIcon style={{ display: 'flex', alignItems: 'center' }}>
            {index == 0 ? (
              <HomeOutlined style={{ color: COLORS.EDLAW_BLUE }} />
            ) : (
              <DoNotDisturbOnIcon style={{ color: COLORS.EDLAW_BLUE }} />
            )}
          </ListItemIcon>
          <ListItemText
            style={{ display: 'flex', alignItems: 'center', fontSize: '16px' }}
            primaryTypographyProps={{ style: textStyling }}
            primary={text}
          />
        </ListItem>
      )
    }
  }

  const NAVITEMS = [
    'Home',
    'Contact Info',
    'Additional Info',
    'District and School',
    'Student or Group Details',
    'Concerns',
  ]
  return (
    <GreySideBox>
      <Accordion
        onChange={onChange}
        expanded={expanded}
        style={{ backgroundColor: 'inherit', boxShadow: 'none' }}
      >
        <AccordionSummary
          expandIcon={width <= CUTOFFS.mobile ? <ExpandMoreIcon /> : null}
          style={{
            width: '100%',
            height: '64px',
            margin: '5px 0px 0px 0px',
            padding: '16px',
          }}
        >
          {expanded
            ? ProgressItem(NAVITEMS[0], 0)
            : ProgressItem(NAVITEMS[selectedIndex], selectedIndex)}
        </AccordionSummary>

        <AccordionDetails style={{ paddingTop: '0px' }}>
          {NAVITEMS.map((text, index) => ProgressItem(text, index)).slice(
            expanded ? 1 : 0
          )}
        </AccordionDetails>
      </Accordion>
    </GreySideBox>
  )
}

export default SideProgressBar
