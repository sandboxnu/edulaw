import { FieldHookConfig, useField } from 'formik';
import React, { ChangeEvent } from 'react';

interface InputProps {
  name: string;
  label: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const MyTextInput: React.FC<InputProps & FieldHookConfig<string>> = ({ ...props }) => {
  const [field, meta] = useField(props);

  return (
    <div key={props.name}>
      <label htmlFor={`${props.id}-${props.name}`}>{props.label}</label>
      <input className="text-input" {...field} onChange={props.onChange} />

      {meta.touched && meta.error ? (
        <div className='error'>{meta.error}</div>
      ) : null}
    </div>
  );
};
