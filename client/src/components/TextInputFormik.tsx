import { InputAdornment, TextField } from "@mui/material";
import React from "react";
import BoxInputStyle from "../styles/BoxInput";
import { ErrorMessage, Field, Form, Formik } from "formik";
import InputField from "../styles/BoxInput";

// export interface Props {
//   tipo: string;
//   placeHolder: string;
//   onchange: (e: React.ChangeEvent<any>) => void;
//   name: string;
// }

export const TextInputFormik: React.FC = () => {
  return (
    <div>
      <Field name="first_name">
        <InputField id="outlined-basic" label="Outlined" variant="outlined" />
      </Field>
      <ErrorMessage name={"name"} />
    </div>
  );
};

export default TextInputFormik;
