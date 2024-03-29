import React, { useEffect } from 'react'
import { ListItemIcon, ListItemText } from '@material-ui/core'
import styled from 'styled-components'
import { HomeOutlined } from '@material-ui/icons'
import DoNotDisturbOnIcon from '@mui/icons-material/DoNotDisturbOn'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { COLORS } from '../../constants/colors'
import { CUTOFFS } from '../../constants/responsive'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import useWindowDimensions from '../../hooks/widthHook'
import { NextRouter, useRouter } from 'next/router'

const GreySideBox = styled.div`
  width: 100%;
  max-width: 300px;
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

const NAVITEMS = [
  ['Home', '/home'],
  ['Contact Info', '/form/contactinfo'],
  ['Additional Info', '/form/additionalinfo'],
  ['District and School', '/form/district'],
  ['Student or Group Details', '/form/group'],
  ['Concerns', '/form/concern'],
  ['Guided Questions', '/form'],
  ['Finish Complaint', '/complete'],
]

const navigate = async ({
  onNavigate,
  router,
  link,
}: {
  onNavigate?: () => Promise<void>
  router: NextRouter
  link: string
}) => {
  if (link === '/complete') return
  if (onNavigate) {
    await onNavigate()
  }
  router.push(link)
}

function SideProgressBar({
  currentPage = 'Guided Questions',
  onNavigate,
}: {
  currentPage?: string
  onNavigate?: () => Promise<void>
}) {
  const [selectedIndex, setSelectedIndex] = React.useState(
    currentPage ? NAVITEMS.findIndex((item) => item[0] == currentPage) : 0
  )
  const width = useWindowDimensions().width
  const [expanded, setExpanded] = React.useState(width >= CUTOFFS.mobile)
  const router = useRouter()

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

  const ProgressItem = ([text, link]: string[], index: number) => {
    const textStyling = {
      fontSize: '16px',
      color: index === selectedIndex ? 'black' : COLORS.TEXT_GREY,
    }

    if (selectedIndex === index) {
      return (
        <SummaryItem
          key={text}
          onClick={() => navigate({ onNavigate, router, link })}
        >
          <ListItemIcon style={{ display: 'flex', alignItems: 'center' }}>
            {index === 0 ? (
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
        <ListItem
          key={text}
          onClick={() => navigate({ onNavigate, router, link })}
        >
          <ListItemIcon style={{ display: 'flex', alignItems: 'center' }}>
            {index === 0 ? (
              <HomeOutlined style={{ color: COLORS.EDLAW_BLUE }} />
            ) : index < selectedIndex ? (
              <CheckCircleIcon style={{ color: COLORS.EDLAW_BLUE }} />
            ) : (
              <DoNotDisturbOnIcon style={{ color: COLORS.TEXT_GREY }} />
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
