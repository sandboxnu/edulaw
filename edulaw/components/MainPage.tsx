import React from 'react'

function MainPage() {
  return (
    <div className="mainpage">
      <div style={{width: '70%', left: '10%', top: '10%', position: 'absolute'}} > {/* in order to place start text in correct place*/}
        <h1>
          File a new complaint with PRS
        </h1>
        <br />
        <p>
          The Problem Resolution System (PRS) is the Department of Elementary and Secondary Education’s (DESE) system for addressing complaints about students’ educational rights.  More information about PRS and what happens when you file a complaint is available
        </p>
        <br />
        <p>
          This guide will walk you through the process of filing a complaint.  After getting your background information, we&apos;ll go through a series of questions about your concerns, and suggest legal language to include in your complaint if the guide identifies that a legal right may have been violated. If you&apos;d rather file the complaint with PRS directly (without the suggestions in this guide) you can do so here
        </p>
        
        <br/>
        <br/>
        <p>
          Still, filing a PRS complaint is important because DESE is not aware of problems in the district unless people file complaints, and your complaint may help not only your student but also other students across Massachusetts. If you have questions, or if the tool is not addressing your concerns as you&apos;re going through the questions to write the complaint, call the EdLaw Project intake line at (617) 910-5829, or fill out the Helpline Intake Form.
        </p>
      </div>
    </div>
  )
}

export default MainPage
