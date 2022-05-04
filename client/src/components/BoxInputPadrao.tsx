import React from 'react';
import BoxInputStyle from '../styles/BoxInput';

export interface Props {
  tipo: string;
  placeHolder: string;
  onChange: (e: React.ChangeEvent<any>) => void;
  name: string;
  value: any;
  error: any;
  helperText: any;
}

export const BoxInputPadrao: React.FC<Props> = ({
  tipo,
  placeHolder,
  onChange,
  name,
  helperText,
}) => {
  return (
    <>
      <BoxInputStyle
        name={name}
        onChange={onChange}
        sx={{
          width: '100%',
          paddingBottom: '10px',
          color: '#fff',
          caretColor: '#fff',
        }}
        type={tipo}
        id="outlined-basic"
        variant="outlined"
        placeholder={placeHolder}
      />
      <div>{helperText}</div>
    </>
  );
};

export default BoxInputPadrao;
