import React from 'react'
import MuiTooltip from '@mui/material/Tooltip'
import HelpIcon from '@mui/icons-material/Help'

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
      <div style={{ display: 'flex' }}>
        <HelpIcon
          style={{ display: 'flex', alignItems: 'center', marginRight: 4 }}
        />
        {props.tooltip!.tooltipText}
      </div>
    </MuiTooltip>
  )
}

export default Tooltip
