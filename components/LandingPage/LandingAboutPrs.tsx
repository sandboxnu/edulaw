import React from 'react'
import Divider from '@mui/material/Divider'
import { DiscUl, MainDiv } from './LandingStyles'

function LandingAboutPrs() {
  return (
    <div>
      <MainDiv>
        <h1>About PRS</h1>
        <Divider />
        <br />
        <h4>
          <em>What is PRS?</em>
        </h4>
        <br />
        <p>
          PRS is the The Massachusetts Department of Elementary and Secondary
          Education’s (DESE) dispute resolution system to respond to complaints
          that a school isn’t following the law.
        </p>
        <br />
        <br />
        <br />
        <h3 id="how-to-file">
          <em>How do I file a complaint?</em>
        </h3>
        <br />
        <p>
          You can file a complaint directly with DESE, or using our tool. The
          tool walks through the process and suggests information to include,
          and then submits the complaint to DESE.
        </p>
        <br />
        <p>
          <strong>Directly with DESE:</strong>
          <br />
          You can file a complaint online directly with DESE here. If you have
          questions, want to talk to someone about your concern, or want to
          request a paper complaint, you can also call PRS at 781-338-3700. PRS
          has interpreters to provide language access assistance.
          <br /> <br />
          This quick guide shows what DESE’s form looks like and explains what
          information to include in each section.
          <br /> <br />
          <strong>Using our walkthrough tool:</strong> <br />
          Our PRS tool can help you file a PRS complaint by walking you through
          the process of writing and submitting the complaint. The tool collects
          all of the basic information that PRS needs, and then asks questions
          to identify information you should include in the section where you
          describe your concerns.
        </p>
        <br />
        <br />
        <br />
        <h3 id="when-to-file">
          <em>When can I file a complaint?</em>
        </h3>
        <br />
        <p>
          PRS handles complaints that allege a school or a district in
          Massachusetts is not meeting legal requirements for education. You can
          file a complaint if you have concerns that a school is violating an
          individual student’s education rights, or a group of students’
          education rights.
          <br /> <br />
          These are some requirements for the complaint:
        </p>
        <br />
        <DiscUl>
          <li>
            The complaint has to be about something that happened during the
            last year. PRS does not handle complaints about rights violations
            that happened more than a year ago.
          </li>
          <li>
            PRS handles complaints against publicly-funded schools. PRS does not
            address complaints about private schools, unless the student goes to
            the private school as their special education placement.
          </li>
        </DiscUl>
        <br />
        <p>
          Explore our Student Rights Guides to learn more about the types of
          concerns included in our walkthrough tool.
        </p>
        <br />
        <br />
        <br />
        <h3 id="who-can-file">
          <em>Who can file a complaint?</em>
        </h3>
        <br />
        <p>
          Anyone can file, including a parent, social worker, attorney,
          counselor, or other third party. If you are not the parent, you will
          need to obtain the parent’s or education decision maker’s permission
          to file a complaint related to a specific child.
          <br />
          <br />
          You can’t file a complaint anonymously. PRS requires that you include
          your name and contact information to submit the complaint.
        </p>
        <br />
        <br />
        <br />
        <h3 id="what-happens">
          <em>What happens when I file a complaint?</em>
        </h3>
        <br />
        <p>
          PRS will notify the school district of your complaint and will reach
          out to the district to get more information. The school district will
          write a report, and you will have a chance to respond if you disagree.
          Then, PRS will make a decision and can order the school district to do
          something to address your concern.
        </p>
      </MainDiv>
    </div>
  )
}

export default LandingAboutPrs
