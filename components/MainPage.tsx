import React from 'react'
import { Button } from '@mui/material'
import { withStyles } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import Link from 'next/link'

function MainPage() {
  const ContinueButton = withStyles(
    {
      root: {
        backgroundColor: '#5064C7',
        width: '100%',
        color: '#FFFFFF',
        padding: '10px',
        borderRadius: '8px',
        margin: '0 auto',
        '&:hover': {
          backgroundColor: '#5064C7',
        },
      },
    },
    { name: 'ContinueButtonMain' }
  )(Button)

  return (
    <div className="mainpage">
      <div
        style={{ width: '70%', left: '10%', top: '10%', position: 'absolute' }}
      >
        {' '}
        {/* in order to place start text in correct place*/}
        <h1>File a new complaint with PRS</h1>
        <br />
        <p>
          The Problem Resolution System (PRS) is the Department of Elementary
          and Secondary Education&apos;s (DESE) system for addressing complaints
          about students’ educational rights. More information about PRS and
          what happens when you file a complaint is available{' '}
          <a href="google.com">here.</a>
        </p>
        <br />
        <p>
          This guide will walk you through the process of filing a complaint.
          After getting your background information, we&apos;ll go through a{' '}
          <b>series of questions</b> about your concerns, and{' '}
          <b>suggest legal language</b> to include in your complaint if the
          guide identifies that a legal right may have been violated. If
          you&apos;d rather file the complaint with PRS directly (without the
          suggestions in this guide) you can do so{' '}
          <a href="google.com">here.</a>
        </p>
        <br />
        <div
          style={{
            backgroundColor: '#F1F1F1',
            padding: '15px',
            borderRadius: '6px',
          }}
        >
          <b>Please note:</b> This guide is intended to be a tool to help
          families fill out a PRS complaint. It is not legal advice and we
          cannot guarantee a particular outcome or that this process will get
          you the outcome you want.
        </div>
        <br />
        <p>
          Still, filing a PRS complaint is important because DESE is not aware
          of problems in the district unless people file complaints, and your
          complaint may help not only your student but also other students
          across Massachusetts. If you have questions, or if the tool is not
          addressing your concerns as you&apos;re going through the questions to
          write the complaint, call the EdLaw Project intake line at (617)
          910-5829, or fill out the Helpline Intake Form{' '}
          <a href="google.com">here.</a>
        </p>
        <br />
        <div
          style={{
            margin: '0 auto',
            width: '60%',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Link href="/DynamicPOC/" passHref>
            <ContinueButton>
              <Typography
                variant="button"
                style={{ textTransform: 'none', color: '#FFFFFF' }}
              >
                I&apos;m ready to start the walkthrough
              </Typography>
            </ContinueButton>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default MainPage
