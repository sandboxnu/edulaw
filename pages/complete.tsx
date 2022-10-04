import NavBar from '../components/Critical/NavBar'
import styled from 'styled-components'
import SideProgressBar from '../components/Critical/SideProgressBar'
import { useRouter } from 'next/router'
import {
  NextEndButton,
  BottomButtonBar,
  BackButton,
  ButtonContainer,
} from '../components/FormStyles/ExtraStyles'
import { BlockQuote } from '../components/FormStyles/QuestionText'
import { jsPDF } from 'jspdf'
import { QuestionType } from '../models/question'
import { FormResult } from '../utils/FormContext'
import { studentSpecialCircumstances } from '../constants/additionalConstants'
import { AdditionalInfoDb } from './api/form/additionalinfo/save'
import { ConcernDB } from './api/form/concern/save'
import { ContactInfoDb } from './api/form/contactinfo/save'
import { DistrictDB } from './api/form/district/save'
import { GroupDB } from './api/form/group/save'
import { FormTemplate } from '../components/Critical/FormTemplate'

const Main = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  align-items: stretch;
`

const LowerRight = styled.div`
  display: flex;
  flex-direction: column;
`
const LowerStuff = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;
`
const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  height: 80vh;
`

const SideBarStyled = styled(SideProgressBar)`
  display: flex
  flex-grow: 1
`

const StyledBottomButtonBar = styled(BottomButtonBar)`
  display: flex
  align-self: flex-end

`

// determines whether the given doc needs a new page added to it
// y denotes where the cursor is placed on the doc in terms of height / the 'y' axis
// since jsPDF is a little bitch (but better than others)
const checkNewPage = (y: number, doc: jsPDF) => {
  if (y > 270) {
    doc.addPage()
    return 25
  }
  return y
}

// writes on given jsPDF and returns new height (y)
const writeDocAbstraction = (
  x: number,
  y: number,
  text: string,
  doc: jsPDF,
  fontStyle?: string,
  align: 'left' | 'center' | 'right' = 'left'
) => {
  if (fontStyle) {
    doc.setFont('times', fontStyle).text(text, x, y, { align: align })
  } else {
    doc.text(text, x, y, { align: align })
  }
  return y + 1 / 3
}

/**
 * helper method to fetch and write all of the pre-form questions onto the given doc
 * TODO needs contact info endpoint, try to clean up as well
 * @param doc the jsPDF doc to write on
 */
async function initialInformation(doc: jsPDF) {
  const x = 1
  const xCenter = doc.internal.pageSize.width / 2
  const xRight = doc.internal.pageSize.width - x
  let y = 1.5
  // gonna be real this also looks ugly afffff but it all looked ugly aff
  const districtSchool = (await (
    await fetch(`/api/form/district/retrieve`)
  ).json()) as DistrictDB
  const contactInfo = (await (
    await fetch(`/api/form/contactinfo/retrieve`)
  ).json()) as ContactInfoDb
  const additionalInfo = (await (
    await fetch(`/api/form/additionalinfo/retrieve`)
  ).json()) as AdditionalInfoDb
  const concerns = (await (
    await fetch(`/api/form/concern/retrieve`)
  ).json()) as ConcernDB
  const groups = (await (
    await fetch(`/api/form/group/retrieve`)
  ).json()) as GroupDB

  writeDocAbstraction(
    x,
    y,
    'First Name: ' + contactInfo.firstName,
    doc,
    'normal'
  )
  y = writeDocAbstraction(
    xRight,
    y,
    'Last Name: ' + contactInfo.lastName,
    doc,
    'normal',
    'right'
  )
  writeDocAbstraction(x, y, 'Email: ' + contactInfo.email, doc)
  y = writeDocAbstraction(
    xRight,
    y,
    'Phone: ' + contactInfo.phoneNum,
    doc,
    undefined,
    'right'
  )
  y = writeDocAbstraction(x, y, 'Address: ' + contactInfo.address, doc)
  writeDocAbstraction(x, y, 'City: ' + contactInfo.city, doc)
  writeDocAbstraction(
    xCenter,
    y,
    'State: ' + contactInfo.state,
    doc,
    undefined,
    'center'
  )
  y = writeDocAbstraction(
    xRight,
    y,
    'Zip Code: ' + contactInfo.zip,
    doc,
    undefined,
    'right'
  )

  y = writeDocAbstraction(
    x,
    y,
    'District: ' + districtSchool.district,
    doc,
    'normal'
  )

  y = writeDocAbstraction(
    x,
    y,
    'School: ' + districtSchool.school,
    doc,
    'normal'
  )

  y = writeDocAbstraction(
    x,
    y,
    'Primary language: ' + additionalInfo.language,
    doc
  )
  y = writeDocAbstraction(
    x,
    y,
    'Relationship to student: ' + additionalInfo.relationship,
    doc
  )
  y = writeDocAbstraction(x, y, 'DESE Accomodations: ', doc)
  const deseSplit = doc.splitTextToSize(
    additionalInfo.deseAccommodations === ''
      ? 'N/A'
      : additionalInfo.deseAccommodations,
    (doc.internal.pageSize.width * 6) / 8.5
  )
  for (let i = 0; i < deseSplit.length; i++) {
    y = checkNewPage(y, doc)
    y = writeDocAbstraction(x + 0.5, y, deseSplit[i], doc)
  }
  y = writeDocAbstraction(
    x,
    y,
    'Currently being addressed by BSEA? ' + additionalInfo.bsea,
    doc
  )

  y = checkNewPage(y, doc)
  y = writeDocAbstraction(
    x,
    y,
    'Filing on behalf of: ' + groups.studentOrGroup,
    doc
  )
  y = writeDocAbstraction(x, y, 'Special Circumstances: ', doc)
  if (groups.specialCircumstances.every((b) => !b)) {
    y = writeDocAbstraction(x + 0.5, y, 'N/A', doc)
  }
  for (let k = 0; k < groups.specialCircumstances.length; k++) {
    y = checkNewPage(y, doc)
    if (groups.specialCircumstances[k]) {
      y = writeDocAbstraction(x + 0.5, y, studentSpecialCircumstances[k], doc)
    }
  }

  y = checkNewPage(y, doc)
  y = writeDocAbstraction(x, y, 'Statement of concerns: ', doc, 'bold')
  const concernsSplit = doc.splitTextToSize(
    concerns.concern,
    (doc.internal.pageSize.width * 6) / 8.5
  )
  for (let j = 0; j < concernsSplit.length; j++) {
    y = checkNewPage(y, doc)
    y = writeDocAbstraction(x + 0.5, y, concernsSplit[j], doc, 'normal')
  }
}

async function _buildDoc(doc: jsPDF, answers: FormResult[]): Promise<jsPDF> {
  const x = 1
  let y = 1
  const y_inc = 0.5

  doc
    .setFont('times', 'bold')
    .text(
      'Student Complaint and Details',
      doc.internal.pageSize.width / 2,
      (doc.internal.pageSize.height * 1) / 11,
      { align: 'center' }
    )
  await initialInformation(doc)
  doc.addPage()

  doc
    .setFont('times', 'bold')
    .text(
      'Begin Complaints',
      doc.internal.pageSize.width / 2,
      (doc.internal.pageSize.height * 1) / 11,
      {
        align: 'center',
      }
    )
  y += y_inc

  answers.forEach(function (item) {
    const splitQuestion = doc.splitTextToSize(
      item.question,
      (doc.internal.pageSize.width * 6) / 8.5
    )
    for (let i = 0; i < splitQuestion.length; i++) {
      y = checkNewPage(y, doc)
      y = writeDocAbstraction(x, y, splitQuestion[i], doc, 'bold')
    }

    if (item.formAnswer.type === QuestionType.TEXT) {
      const splitAnswer = doc.splitTextToSize(
        item.formAnswer.userAnswer,
        (doc.internal.pageSize.width * 6) / 8.5
      )
      for (let i = 0; i < splitAnswer.length; i++) {
        y = checkNewPage(y, doc)
        y = writeDocAbstraction(x + 0.5, y, splitAnswer[i], doc, 'normal')
      }
      y = writeDocAbstraction(x, y, '\n', doc)
    }
  })
  return doc
}

function Final() {
  const router = useRouter()
  const {
    query: { data },
  } = router

  async function _handleSubmit() {
    if (typeof data !== 'string') return
    const doc = new jsPDF({ unit: 'in', format: 'letter' })
    const results = JSON.parse(data) as FormResult[]
    if (results.length > 0) {
      _buildDoc(doc, results)
        .then((doc) => {
          doc.save('PRS_Complaint.pdf')
          router.push('/complete')
        })
        .catch((err) => {
          alert('An error occurred while generating the PDF. Please try again.')
          console.error(err)
        })
    }
  }

  return (
    <FormTemplate
      onBack={() => router.push('/form')}
      onSubmit={_handleSubmit}
      nextButtonText="Download"
      currentPage="Finish Complaint"
      loaded={true}
      title="What happens next?"
    >
      <p>
        When you click “Download” below, a PDF version of your complaint will
        download to your computer. To send it to DESE, you can send an email to
        compliance@doe.mass.edu with the attachment and the subject line
        &lsquo;PRS Complaint&rsquo;.
      </p>
      <br />
      <br />
      <BlockQuote questionText="Please note: You do not need to include anything in the body of the email."></BlockQuote>
      <br />
      <p>
        Once you send them the complaint, someone from PRS should reach out to
        you within 3-5 days. You are always welcome to contact the EdLaw Project
        intake line with questions about the process, but the complaint goes
        directly to PRS. PRS will communicate with you directly and will not
        tell the EdLaw Project that they get your complaint, or any updates
        about the result.
      </p>
      <br />
      <br />
      <p>
        DESE has a website with more information about the complaint process.
        You can view that information{' '}
        <a href=" https://www.doe.mass.edu/prs/">here.</a>
      </p>
    </FormTemplate>
  )
}

export default Final
