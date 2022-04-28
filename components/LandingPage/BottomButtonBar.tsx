import React from 'react'
import styled from 'styled-components'
import {
  BottomButtonBar,
  ButtonContainer,
  NextEndButton,
} from '../FormStyles/ExtraStyles'
import Link from 'next/link'

const StickyBottom = styled(BottomButtonBar)`
  position: sticky;
  bottom: 0;
`

function BottomBar() {
  return (
    <StickyBottom>
      <ButtonContainer>
        <Link href={'/home'} passHref>
          <NextEndButton>Continue</NextEndButton>
        </Link>
      </ButtonContainer>
    </StickyBottom>
  )
}

export default BottomBar
