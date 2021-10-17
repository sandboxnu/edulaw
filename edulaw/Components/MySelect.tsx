import { FieldHookConfig, useField } from 'formik';
import React from 'react';

interface InputProps {
  label: string;
}

export const MySelect: React.FC<InputProps & FieldHookConfig<string>> = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div>
      <label htmlFor={props.id || props.name}>{label}</label>
      <select {...field} {...props} />
      
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  );
};
