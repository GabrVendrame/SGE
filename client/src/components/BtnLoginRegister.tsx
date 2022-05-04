import { Button } from '@mui/material';
import React from 'react';

export interface Props {
  onclick: Function;
  name: string;
}

export const BtnLoginRegister: React.FC<Props> = ({ onclick, name }) => {
  return (
    <Button
      type="submit"
      sx={{
        borderRadius: '30px',
        background: '#6750A4',
        width: '100%',
        paddingBottom: '10px',
        height: '43px',
      }}
      variant="contained"
    >
      {name}
    </Button>
  );
};

export default BtnLoginRegister;
