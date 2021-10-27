import { makeStyles } from '@material-ui/styles'
import React, { FC } from 'react'

const useStyles = makeStyles((theme) => ({
  splitPage: {
    width: '100%',
    height: '100%',
    display: 'flex',
  }
}));

interface SplitPageProps {
  left: JSX.Element,
  right: JSX.Element
  center?: JSX.Element,
  leftPercentage?: Number,
  rightPercentage?: Number
  centerPercentage?: Number
}

const SplitPage: FC<SplitPageProps> = ({ left, right, center = <div></div>, leftPercentage = 70, rightPercentage = 30, centerPercentage = 0 }): JSX.Element => {
  const classes = useStyles();
  return (
    <div className={classes.splitPage}>
      <div style={{ width: leftPercentage + '%', height: '100%', position: 'relative' }}>
        {left}
      </div>
      <div style={{ width: centerPercentage + '%', height: '100%', position: 'relative' }}>
        {center}
      </div>
      <div style={{ width: rightPercentage + '%', height: '100%', position: 'relative' }}>
        {right}
      </div>
    </div>
  )
}

export default SplitPage
