import { InputAdornment, MenuItem, Select } from "@mui/material";
import React from "react";
import BoxInputStyle from "../styles/BoxInput";

// export interface Props {
//   tipo: string;
//   placeHolder: string;
//   onchange: (e: React.ChangeEvent<any>) => void;
//   name: string;
// }

export const BoxInputSelect: React.FC = ({}) => {
  return (
    <Select
      labelId="demo-simple-select-label"
      id="demo-simple-select"
      value={"age"}
      label="Age"
      // onChange={handleChange}
    >
      <MenuItem value={10}>Ten</MenuItem>
      <MenuItem value={20}>Twenty</MenuItem>
      <MenuItem value={30}>Thirty</MenuItem>
    </Select>
  );
};

export default BoxInputSelect;
