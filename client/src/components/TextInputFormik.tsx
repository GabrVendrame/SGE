import React from 'react';
import {
  ErrorMessage, Field, Form, Formik,
} from 'formik';
import InputField from '../styles/BoxInput';

export const TextInputFormik: React.FC = () => {
  return (
    <div>
      <Field name="first_name">
        <InputField id="outlined-basic" label="Outlined" variant="outlined" />
      </Field>
      <ErrorMessage name={'name'} />
    </div>
  );
};

export default TextInputFormik;
