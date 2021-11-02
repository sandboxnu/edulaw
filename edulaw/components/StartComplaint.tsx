import React from 'react'
import Button from '@material-ui/core/Button';
import styles from '../styles/component/StartComplaint.module.css';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core';
import Link from 'next/link'

const ContinueButton = withStyles({ // TODO: custom button component for design? theme? refactor styling eventually
  root: {
    backgroundColor: "#5064C7",
    width: "100%", 
    color: "#FFFFFF",
    //textTransform: "lowercase",
    '&:hover': {
      backgroundColor: '#5064C7',
    },
  },
})(Button);

function StartComplaint() { 
  return (
    <div className={styles.complaint}> 
      <div className={styles.complaintWrapper}> 
        <Typography variant="h4">Start My Complaint</Typography>
        <p className={styles.captionText}>Our new tool will walk you through the process of filing a new PRS complaint. </p>
        <ContinueButton disableElevation>
          <Link href={"/home"}>
            <a target="_blank">
              <Typography variant="button" style={{ textTransform: 'none', color: "#FFFFFF"}}>Continue</Typography>
            </a>
          </Link>
        </ContinueButton> 
      </div>
    </div>
  )
}

export default StartComplaint
