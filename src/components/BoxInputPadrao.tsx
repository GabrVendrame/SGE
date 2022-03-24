import { InputAdornment } from "@mui/material";
import React from "react";
import BoxInputStyle from "../styles/BoxInput";

export interface Props {
  tipo: string;
  placeHolder: string;
  onchange: (e: React.ChangeEvent<any>) => void;
  name: string;
}

export const BoxInputPadrao: React.FC<Props> = ({
  tipo,
  placeHolder,
  onchange,
  name,
}) => {
  return (
    <BoxInputStyle
      name={name}
      onChange={onchange}
      sx={{
        width: "100%",
        paddingBottom: "10px",
        color: "#fff",
        caretColor: "#fff",
      }}
      type={tipo}
      id="outlined-basic"
      variant="outlined"
      placeholder={placeHolder}
      InputProps={{
        endAdornment: <InputAdornment position="end">kg</InputAdornment>,
      }}
    />
  );
};

export default BoxInputPadrao;
