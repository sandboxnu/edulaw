import {
  BottomButtonBar,
  ButtonContainer,
  BackButton,
  NextEndButton,
} from '../FormStyles/ExtraStyles'

interface BottomBarProps {
  onBack?: () => void
  nextButtonText: string
}

export const BottomBar: React.FC<BottomBarProps> = ({
  onBack,
  nextButtonText,
}) => {
  return (
    <BottomButtonBar>
      <ButtonContainer>
        {onBack && (
          <BackButton type="button" onClick={onBack}>
            Back
          </BackButton>
        )}
        <NextEndButton type="submit">{nextButtonText}</NextEndButton>
      </ButtonContainer>
    </BottomButtonBar>
  )
}
