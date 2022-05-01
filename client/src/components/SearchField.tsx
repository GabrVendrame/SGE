import { styled, TextField } from '@mui/material';

// TextField personalizado
const SearchField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#C3BFC3',
      // borderColor: 'none',
    },
    '&:hover fieldset': {
      borderColor: 'white',
      // borderColor: '#000000',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#DEC0F7',
      // borderColor: '#580899',
    },
    // backgroundColor: '#ffffff',
    // borderRadius: '25px',
    WebkitTextFillColor: '#ffffff',
  },
});

export default SearchField;
