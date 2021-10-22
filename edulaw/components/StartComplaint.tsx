import React from 'react'
import Button from '@material-ui/core/Button';
import styles from '../styles/component/StartComplaint.module.css';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core';

const ContinueButton = withStyles({ // TODO: custom button component for design? theme? refactor styling eventually
                                    // TODO: button styling (accidentally set it as active when inactive)
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
        <ContinueButton disableElevation >
          <Typography variant="button" style={{ textTransform: 'none'}}>Continue</Typography>
        </ContinueButton> 
      </div>
    </div>
  )
}

export default StartComplaint
