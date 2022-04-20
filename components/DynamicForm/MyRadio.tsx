import { FieldHookConfig, useField } from 'formik'
import React, { ChangeEvent } from 'react'
import { Answer } from '../../models'
import { RadioFormAnswer } from '../../utils/FormContext'
import {
  RadioButton,
  RadioInputCheckedIcon,
  RadioInputIcon,
} from '../../components/FormStyles/RadioButton'
import QuestionLayout from '../FormStyles/QuestionLayout'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import styled from 'styled-components'

const StyledRadioText = styled.body`
  font-size: 14px;
`
interface MyRadioProps {
  name: string
  label: string
  options: Answer[]
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  ans?: RadioFormAnswer
  tooltip?: { tooltipText: string; tooltipHoveredText: string }
}

export const MyRadio: React.FC<MyRadioProps & FieldHookConfig<string>> = (
  props
): JSX.Element => {
  const [field, meta] = useField(props)
  const { ans, name, label, options, onChange, tooltip } = props
  // renders input type radio, determines whether or not it should be checked initially
  function renderButtonRadio(option: Answer, optionId: number): JSX.Element {
    return (
      <div key={option.content}>
        <RadioButton
          type="radio"
          {...field}
          value={optionId}
          onChange={onChange}
          defaultChecked={ans && optionId === ans.answerId}
        />
        <label>{option.content}</label>
      </div>
    )
  }
  function renderLongRadio(option: Answer, optionId: number) {
    return (
      <FormControlLabel
        style={{ marginLeft: 0 }}
        value={optionId}
        key={option.content}
        label={<StyledRadioText>{option.content || ''}</StyledRadioText>}
        control={
          <Radio
            icon={<RadioInputIcon />}
            checkedIcon={<RadioInputCheckedIcon />}
            disableRipple
            {...field}
            onChange={onChange}
            value={optionId}
          />
        }
      />
    )
  }

  const renderRadioAnswers = (options: Answer[]) => {
    return options.some(({ content }) => content && content.length < 10) ? (
      <>{options.map(renderButtonRadio)}</>
    ) : (
      <RadioGroup style={{ gap: 8 }} defaultValue={ans && ans.answerId}>
        {/* Reverse is called here so that y */}
        {options.reverse().map(renderLongRadio)}
      </RadioGroup>
    )
  }

  return (
    <div key={name} role="group" aria-labelledby="my-radio-group">
      <QuestionLayout
        questionText={label}
        tooltip={tooltip}
        input={renderRadioAnswers(options)}
      />

      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  )
}
