import React from 'react'
import { useRouter } from 'next/router'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Collapse from '@mui/material/Collapse'
import Divider from '@mui/material/Divider'
import ExpandMore from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import SubMenuItem from './SubMenuItem'
import Link from 'next/link'
import { COLORS } from '../../constants/colors'

enum MENU_OPTS {
  INFO = '/info',
  ABOUT_PRS = '/prs',
}

function RightsPrsMenu() {
  const router = useRouter()
  const pathname = router.pathname

  const MainListItem = (label: string, link: string) => {
    return (
      <Link href={link} passHref>
        <ListItemButton sx={{ width: '100%' }}>
          {pathname === link ? <ExpandLessIcon /> : <ExpandMore />}
          <ListItemText
            primary={label}
            sx={{ fontSize: '22px', fontWeight: 400, pl: 1 }}
          />
        </ListItemButton>
      </Link>
    )
  }

  return (
    <List
      sx={{
        width: '100%',
        background: COLORS.LIGHT_GREY,
        padding: '4px',
        position: 'sticky',
        top: '15px',
      }}
    >
      {MainListItem('General Information', MENU_OPTS.INFO)}
      <Collapse in={pathname === MENU_OPTS.INFO} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <SubMenuItem
            label={'School Discipline & Education'}
            link={`${MENU_OPTS.INFO}#school-discipline`}
          />
          <SubMenuItem
            label={'Special Education'}
            link={`${MENU_OPTS.INFO}#special-education`}
          />
          <SubMenuItem label={'Bullying'} link={`${MENU_OPTS.INFO}#bullying`} />
        </List>
      </Collapse>
      <Divider />
      {MainListItem('About PRS', MENU_OPTS.ABOUT_PRS)}
      <Collapse
        in={pathname === MENU_OPTS.ABOUT_PRS}
        timeout="auto"
        unmountOnExit
      >
        <List component="div" disablePadding>
          <SubMenuItem
            label={'How do I file a complaint?'}
            link={`${MENU_OPTS.ABOUT_PRS}#how-to-file`}
          />
          <SubMenuItem
            label={'When can I file a complaint?'}
            link={`${MENU_OPTS.ABOUT_PRS}#when-to-file`}
          />
          <SubMenuItem
            label={'Who can file a complaint?'}
            link={`${MENU_OPTS.ABOUT_PRS}#who-can-file`}
          />
          <SubMenuItem
            label={'What happens when I file?'}
            link={`${MENU_OPTS.ABOUT_PRS}#what-happens`}
          />
        </List>
      </Collapse>
      <Divider />
    </List>
  )
}

export default RightsPrsMenu
