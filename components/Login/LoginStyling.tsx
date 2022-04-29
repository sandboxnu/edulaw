import styled from 'styled-components'
import { Button } from '../FormStyles/Button'

// shared styling for sign-in and sign-up pages
export const Container = styled.div`
  background-color: #ffffff;
  display: flex;
  justify-content: flex-start;
  flex-flow: column;
  gap: 20px;
  align-items: flex-start;
`

export const Title = styled.h2`
  font-family: Source Sans Pro;
  font-style: normal;
  font-weight: 600;
  font-size: 34px;
  line-height: 35px;
`

export const SubTitle = styled.p`
  margin-bottom: 30px;
`
export const SubContainer = styled.div`
  display: flex;
  flex-flow: column;
  align-items: flex-end;
  justify-content: space-evenly;
  gap: 8px;
  margin-top: 10px;
`

export const EStyledButton = styled(Button)`
  margin-top: 15px;
  width: 356px;
  background-color: #5064c7;
  color: #ffffff;
  :hover {
    box-shadow: 0 12px 16px 0 rgba(0, 0, 0, 0.24),
      0 17px 50px 0 rgba(0, 0, 0, 0.19);
  }
`

export const BackButton = styled.button`
  border: none;
  background: none;
  font-family: Source Sans Pro;
  font-style: normal;
  font-weight: 600;
  font-size: 28px;
  color: #5064c7;
  margin-bottom: 10px;

  :hover {
    text-shadow: 2px 2px 4px gray;
  }
`
