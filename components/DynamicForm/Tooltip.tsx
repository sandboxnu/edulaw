import React from 'react'
import MuiTooltip from '@mui/material/Tooltip'
import HelpIcon from '@mui/icons-material/Help'

interface TooltipProps {
  tooltipText?: string
  tooltipHoveredText?: string
}

function Tooltip(props: TooltipProps) {
  const shouldRender = !!props.tooltipText && !!props.tooltipHoveredText
  if (!shouldRender) {
    return null
  }

  return (
    <MuiTooltip title={props.tooltipHoveredText!} placement="top-start">
      <div>
        <HelpIcon />
        {props.tooltipText!}
      </div>
    </MuiTooltip>
  )
}

export default Tooltip
