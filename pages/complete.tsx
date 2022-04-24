import NavBar from '../components/Critical/NavBar'
import styled from 'styled-components'
import SideProgressBar from '../components/Critical/SideProgressBar'

const Main = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  align-items: stretch;
`

function final() {
  return (
    <Main>
      <SideProgressBar />
    </Main>
  )
}
