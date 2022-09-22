import { AppBar, Toolbar } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import { COLORS } from '../../constants/colors'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import styled from 'styled-components'

import MuiTooltip from '@mui/material/Tooltip'
import Logo from './Logo'
import { signOut } from 'next-auth/react'

const NeedHelpContainer = styled.div`
  display: flex;
  margin-right: 25px;
  align-items: center;
`

const StyledHelpIcon = styled.div`
  color: white;
  margin-right: 8px;
  height: 30px;
  display: flex;
  align-items: center;
`
function NavBar() {
  const tooltipText = (
    <p>
      If you feel like the questions in this guide aren&apos;t addressing your
      concerns, call the EdLaw Project Intake line at{' '}
      <strong>617.910.5829</strong>, or email us at{' '}
      <strong>edlawproject@publiccouncil.net</strong>
    </p>
  )
  return (
    <AppBar
      position="static"
      style={{
        backgroundColor: COLORS.EDLAW_BLUE,
        height: '80px',
        boxShadow: '0px 3px 4px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Toolbar style={{ padding: '0px', justifyContent: 'space-between' }}>
        <Logo />
        <MuiTooltip title={tooltipText} placement="bottom-start" arrow>
          <NeedHelpContainer>
            <StyledHelpIcon>
              <HelpOutlineIcon />
            </StyledHelpIcon>
            <Typography style={{ color: 'white', fontSize: 16 }}>
              Need help?
            </Typography>
            <button onClick={() => signOut()}>Sign out</button>
          </NeedHelpContainer>
        </MuiTooltip>
      </Toolbar>
    </AppBar>
  )
}

export default NavBar
