import React from 'react'
import SideProgressBar from './SideProgressBar'
import styles from '../styles/SidePage.module.css'

function SidePage() {
  return (
    <div className="sidepage" style={{float: 'left', position: 'absolute'}}>
      
      <SideProgressBar/>
    </div>
  )
}

export default SidePage
