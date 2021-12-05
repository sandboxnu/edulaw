import styled from 'styled-components'
import NavBar from '../Critical/NavBar'
import SplitPage from '../Critical/SplitPage'
import SideProgressBar from '../Critical/SideProgressBar'

interface MyLayoutProps {
  question: JSX.Element
}

// div for question and titles
const VerticalBox = styled.div`
  display: flex;
  flex-direction: vertical;
`

// horizontal box
const HorizontalBox = styled.div`
  display: flex;
  flex-direction: horizontal;
`
const TitleText = styled.h1`
  font-size: large;
`

//make an interface that takes in a Formik component
// have this have the split layout and navbar n stuff.
// Code in DynamicPOC/index.tsk
export const Page: React.FC<MyLayoutProps> = (question) => {
  return (
    <>
      <NavBar></NavBar>
      <HorizontalBox>
        <div>{question}</div>
        <SideProgressBar />
      </HorizontalBox>
    </>
  )
}
