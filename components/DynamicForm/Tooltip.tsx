import React from 'react'
import MuiTooltip from '@mui/material/Tooltip'
import HelpIcon from '@mui/icons-material/Help'
import styled from 'styled-components'
import { COLORS } from '../../constants/colors'

const TooltipBox = styled.div`
  background: #5365c10f;
  display: flex;
  width: fit-content;
  padding-left: 8px;
  padding-right: 8px;
  border-radius: 4px;
`

const StyledIcon = styled(HelpIcon)`
  display: flex;
  align-items: center;
  margin-right: 4px;
  padding: 4px;
  color: ${COLORS.EDLAW_BLUE};
`
const TextStyling = styled.p`
  font-size: 12px;
  align-self: center;
  text-decoration: underline;
  color: ${COLORS.EDLAW_BLUE};
`

interface TooltipProps {
  tooltip?: { tooltipText: string; tooltipHoveredText: string }
}

/**
 * Represents a tooltip object to give additional popup information for a question
 */
function Tooltip(props: TooltipProps) {
  const shouldRender = !!props.tooltip
  if (!shouldRender) {
    return null
  }

  return (
    <MuiTooltip title={props.tooltip!.tooltipHoveredText} placement="top-start">
      <TooltipBox>
        <StyledIcon />
        <TextStyling>{props.tooltip!.tooltipText}</TextStyling>
      </TooltipBox>
    </MuiTooltip>
  )
}

export default Tooltip
