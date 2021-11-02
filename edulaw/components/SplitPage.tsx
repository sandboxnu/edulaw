import { makeStyles } from '@material-ui/styles'
import React, { FC } from 'react'

const useStyles = makeStyles((theme) => ({
  splitPage: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'stretch',
  }
}));

interface SplitPageProps {
  left: JSX.Element,
  right: JSX.Element,
  center?: JSX.Element,
  leftStyle?: React.CSSProperties,
  rightStyle?: React.CSSProperties,
  centerStyle?: React.CSSProperties,
}

const SplitPage: FC<SplitPageProps> = ({ left, right, center = <div></div>, leftStyle={ width: '70%', height: '100%', position: 'relative'}, centerStyle={ width: '0%', height: '100%', position: 'relative'},
rightStyle={ width: '30%', height: '100%', position: 'relative'}}): JSX.Element => {
  const classes = useStyles();
  return (
    <div className={classes.splitPage}>
      <div style={leftStyle}>
        {left}
      </div>
      <div style={centerStyle}>
        {center}
      </div>
      <div style={rightStyle}>
        {right}
      </div>
    </div>
  )
}

export default SplitPage
