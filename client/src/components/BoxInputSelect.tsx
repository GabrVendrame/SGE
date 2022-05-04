import { InputAdornment, MenuItem, Select } from '@mui/material';
import React from 'react';

export const BoxInputSelect: React.FC = () => {
  return (
    <Select
      labelId="demo-simple-select-label"
      id="demo-simple-select"
      value={'age'}
      label="Age"
    >
      <MenuItem value={10}>Ten</MenuItem>
      <MenuItem value={20}>Twenty</MenuItem>
      <MenuItem value={30}>Thirty</MenuItem>
    </Select>
  );
};

export default BoxInputSelect;
