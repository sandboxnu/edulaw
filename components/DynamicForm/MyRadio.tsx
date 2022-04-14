import { FieldHookConfig, useField } from 'formik'
import React, { ChangeEvent } from 'react'
import { Answer } from '../../models'
import { FormAnswer } from '../../utils/FormContext'
import { RadioButton } from '../../components/FormStyles/RadioButton'
import { QuestionText } from '../FormStyles/QuestionText'
import QuestionLayout from '../FormStyles/QuestionLayout'
import Tooltip from './Tooltip'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import styled from 'styled-components'
import { COLORS } from '../../constants/colors'
import { Typography } from '@material-ui/core'

const RadioInputIcon = styled.span`
  border-radius: 50%;
  width: 20px;
  height: 20px;
  box-shadow: inset 0 0 0 1px rgba(16, 22, 26, 0.2),
    inset 0 -1px 0 rgba(16, 22, 26, 0.1);
  background-color: #f5f8fa;
  background-image: linear-gradient(
    rgba(255, 255, 255, 0.05),
    rgba(255, 255, 255, 0)
  );
  margin-right: 8px;
`

const RadioInputCheckedIcon = styled(RadioInputIcon)`
  background-color: ${COLORS.EDLAW_BLUE};
  linear-gradient(rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0));
  &:before {
    display: block;
    width: 20px;
    height: 20px;
    background-image: radial-gradient(
      rgb(255, 255, 255),
      rgb(255, 255, 255) 28%,
      transparent 32%
    );
    content: '';
  }
`

interface MyRadioProps {
  name: string
  label: string
  options: Answer[]
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  ans?: FormAnswer
  tooltip?: { tooltipText: string; tooltipHoveredText: string }
}
interface MyRadioAnswersProps {
  options: Answer[]
}

export const MyRadio: React.FC<MyRadioProps & FieldHookConfig<string>> = ({
  ...props
}): JSX.Element => {
  const [field, meta] = useField(props)
  // renders input type radio, determines whether or not it should be checked initially
  function initialRadio(optionId: number): JSX.Element {
    return (
      <RadioButton
        type="radio"
        {...field}
        value={optionId}
        onChange={props.onChange}
        defaultChecked={props.ans && optionId.toString() === props.ans.answerId}
      />
    )
  }
  function longRadio(optionId: number, option: Answer) {
    return (
      <FormControlLabel
        style={{ marginLeft: 0 }}
        value={optionId}
        control={
          <Radio
            icon={<RadioInputIcon />}
            checkedIcon={<RadioInputCheckedIcon />}
            disableRipple
          />
        }
        label={<Typography>{option.content || 'h'}</Typography>}
        defaultChecked={props.ans && optionId.toString() === props.ans.answerId}
      />
    )
  }

  const renderRadioAnswers = (options: Answer[]) => {
    if (
      false &&
      options.some((option) => option.content && option.content.length < 10)
    ) {
      return (
        <>
          {options.map(function (option, i) {
            return (
              <div key={option.content}>
                {initialRadio(i)}
                <label>{option.content}</label>
              </div>
            )
          })}
        </>
      )
    } else {
      return (
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          onChange={props.onChange}
        >
          {options.map((option, i) => {
            return longRadio(i, option)
          })}
        </RadioGroup>
      )
    }
  }

  return (
    <div key={props.name} role="group" aria-labelledby="my-radio-group">
      <QuestionLayout
        questionText={<QuestionText>{props.label}</QuestionText>}
        tooltip={<Tooltip tooltip={props.tooltip} />}
        input={renderRadioAnswers(props.options)}
      />

      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  )
}
