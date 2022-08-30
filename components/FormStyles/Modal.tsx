import { Box, Modal } from '@material-ui/core'
import React from 'react'
import styled from 'styled-components'
import { COLORS } from '../../constants/colors'
import { Button } from './Button'
const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
  borderRadius: 8,
  p: 4,
}
const TextStyling = styled.p`
  font-size: 16px;
  align-self: center;
  line-height: 150%;
  color: ${COLORS.TEXT_DARKGREY};
`
const TitleTextStyling = styled.p`
  font-size: 16px;
  font-weight: 600;
  align-self: center;
  line-height: 150%;
  margin-bottom: 20px;
  color: ${COLORS.TEXT_DARKGREY};
`
const ButtonContainer = styled.div`
  margin-top: 40px;
  display: flex;
  justify-content: end;
`
export default function StyledModal() {
  const [open, setOpen] = React.useState(false)
  // const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false)
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <TitleTextStyling>
          What if i speak more than one language?
        </TitleTextStyling>
        <TextStyling>The alternatives w</TextStyling>
        <ButtonContainer>
          <Button primary width={100}>
            Close
          </Button>
        </ButtonContainer>
      </Box>
    </Modal>
  )
}
