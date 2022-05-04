import '../styles/Home.css';
import { ThemeProvider } from '@mui/material/styles';
import { Box } from '@material-ui/core';
import { IconButton, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import React, { useState } from 'react';
import Header from '../components/Header';
import ResponsiveDrawer from '../components/ResponsiveDrawer';
import Itens from '../components/Itens';
import ButtonStyles from '../styles/MuiStyles';
import SearchField from '../components/SearchField';

function Home() {
  const theme = ButtonStyles;
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [searchValues, setSearchValues] = useState('');
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValues(event.target.value);
  };

  const pages = [
    { id: 0, text: 'Sobre nós' },
    { id: 1, text: 'FAQ' },
    { id: 2, text: 'Contato' },
  ];
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          width: '100%',
          position: 'fixed',
        }}
      >
        <Header
          pages={pages}
          isOpenDrawer={isOpenDrawer}
          setIsOpenDrawer={setIsOpenDrawer}
        />

        <ResponsiveDrawer
          pages={pages}
          isOpenDrawer={isOpenDrawer}
          setIsOpenDrawer={setIsOpenDrawer}
        />
        <Box className="divSearchbarAndItens">
          <SearchField
            onChange={handleChange}
            sx={{ marginTop: { sm: '35px' }, mb: '25px' }}
            fullWidth
            placeholder="Pesquisar evento ou apresentação"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="secondary" />
                </InputAdornment>
              ),
              endAdornment: (
                <IconButton>
                  <ClearIcon color="secondary" />
                </IconButton>
              ),
            }}
          />
          <Itens searchValues={searchValues} />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default Home;
