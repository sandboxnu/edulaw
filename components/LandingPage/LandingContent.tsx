import React from 'react'
import Divider from '@mui/material/Divider'
import { MainDiv } from './LandingStyles'

function LandingContent() {
  return (
    <div className="main">
      <MainDiv>
        {/* put this in a stylesheet eventually :D and put the content into a const / cleanup*/}
        <h1>Filing a Complaint with the State Department of Education</h1>
        <Divider />
        <br />
        <p>
          The Problem Resolution System (PRS) is the Massachusetts Department of
          Elementary and Secondary Education&apos;s (DESE) system for addressing
          complaints about students&apos; education rights and the legal
          requirements for education.{' '}
          <em>
            If you think a school or district has violated a student&apos;s
            rights
          </em>
          , you can submit a complaint online.
        </p>
        <br />
        <p>
          This tool can walk you through the process of writing and submitting a
          PRS complaint. Use the navigation bar on the left to learn more about
          PRS and the types of situations that the tool covers.
        </p>
        <br />
        <p>
          When you are ready, you can select &quot;Continue&quot; on the right
          to start your complaint. Please note that this resource only applies
          to students in Massachusetts.
        </p>
        <br /> <br />
      </MainDiv>
    </div>
  )
}

export default LandingContent
