import NavBar from '../components/Critical/NavBar'
import styled from 'styled-components'
import SideProgressBar from '../components/Critical/SideProgressBar'
import { useRouter } from 'next/router'
import { NextEndButton } from '../components/FormStyles/ExtraStyles'
import { jsPDF } from 'jspdf'
import { QuestionType } from '../models/question'
import { FormResult } from '../utils/FormContext'

const Main = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  align-items: stretch;
`
const LowerStuff = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;
`
const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
`

const SideBarStyled = styled(SideProgressBar)`
  display: flex
  flex-grow: 1
`

function Final() {
  const router = useRouter()
  const {
    query: { data },
  } = router

  function _buildDoc(doc: jsPDF, answers: FormResult[]): jsPDF {
    const x = 10
    let y = 10
    const y_inc = 8

    answers.forEach(function (item) {
      const splitQuestion = doc.splitTextToSize(item.question, 200)
      for (let i = 0; i < splitQuestion.length; i++) {
        doc.setFont('times', 'bold').text(splitQuestion[i], x, y)
        y += y_inc
      }
      if (item.answer != null) {
        doc.setFont('times', 'normal').text('\t' + item.answer + '\n\n', x, y)
        y += y_inc
      }
      if (item.formAnswer.type === QuestionType.TEXT) {
        const splitAnswer = doc.splitTextToSize(item.formAnswer.userAnswer, 200)
        for (let i = 0; i < splitAnswer.length; i++) {
          doc.setFont('times', 'normal').text('\t' + splitAnswer[i], x, y)
          y += y_inc
        }
        doc.text('\n', x, y)
        y += y_inc
      }
    })
    return doc
  }

  function _handleSubmit() {
    if (typeof data === 'string') {
      let doc = new jsPDF()
      const results = JSON.parse(data)
      doc = _buildDoc(doc, results)
      doc.save('PRS_Complaint.pdf')
    } else {
      console.error('Expected type: string, not received')
    }
  }
  return (
    <Main>
      <NavBar />
      <LowerStuff>
        <SideBarStyled />
        <InfoSection
          style={{
            width: '80%',
            right: '20%',
            padding: '10%',
            paddingTop: '5%',
            paddingBottom: '5%',
          }}
        >
          <h1>What happens next?</h1>
          <br />
          <br />
          <p>
            When you click “download complaint” below, a PDF version of your
            complaint will download to your computer. To send it to DESE, you
            can send an email to compliance@doe.mass.edu with the attachment and
            the subject line ‘PRS Complaint’.
          </p>
          <br />
          <br />
          <p>
            Once you send them the complaint, someone from PRS should reach out
            to you within 3-5 days. You are always welcome to contact the EdLaw
            Project intake line with questions about the process, but the
            complaint goes directly to PRS. PRS will communicate with you
            directly and will not tell the EdLaw Project that they get your
            complaint, or any updates about the result.
          </p>
          <br />
          <br />
          <p>
            DESE has a website with more information about the complaint
            process. You can view that information here.
          </p>
          <NextEndButton onClick={() => _handleSubmit()}></NextEndButton>
        </InfoSection>
      </LowerStuff>
    </Main>
  )
}

export default Final
