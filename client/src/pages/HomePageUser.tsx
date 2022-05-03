import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import '../styles/HomePageUser.css';
import Axios from 'axios';

import { ThemeProvider } from '@mui/material/styles';
import { Box } from '@material-ui/core';
import { IconButton, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import Header from '../components/HeaderLogged';
// import ResponsiveDrawer from "../components/ResponsiveDrawer";
import ResponsiveDrawer from '../components/ResponsiveDrawer';
import Itens from '../components/Itens';
import ButtonStyles from '../styles/MuiStyles';
import SearchField from '../components/SearchField';
import ResponsiveDrawerUsuarioComum from '../components/ResponsiveDrawerUsuarioComum';

import ResponsiveDrawerUsuarioPalestrante from '../components/ResponsiveDrawerUsuarioPalestrante';
import ResponsiveDrawerUsuarioCE from '../components/ResponsiveDrawerUsuarioCE';

export interface User {
  name: string;
  email: string;
  password: string;
  cpfCnpj: string;
  cell: string;
  userType: string;
  userRegisteredEvents: [{
    eventId: string,
    numEventTickets: number,
    userRegisteredPresentationsId: [{
      presentationId: string,
      numPresTickets: number,
    }]
  }],
}

function HomePageUser() {
  const theme = ButtonStyles;

  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [searchValues, setSearchValues] = useState('');
  const [userType, setUserType] = useState('');
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(event.target.value);
    setSearchValues(event.target.value);
  };
  const [user, setUser] = useState<User>({
    name: '',
    email: '',
    password: '',
    cpfCnpj: '',
    cell: '',
    userType: '',
    userRegisteredEvents: [{
      eventId: '',
      numEventTickets: 0,
      userRegisteredPresentationsId: [{
        presentationId: '',
        numPresTickets: 0,
      }],
    }],
  });
  const [tk, setTk] = useState<any>();
  const navigate = useNavigate();
  const pages = [
    { id: 0, text: 'Sobre nós' },
    { id: 1, text: 'FAQ' },
    { id: 2, text: 'Contato' },
  ];

  useEffect(() => {
    setTk(localStorage.getItem('token'));
    Axios.get(
      `http://localhost:3001/api/users/find/${localStorage.getItem('token')}`,
    )
      .then((res) => {
        // console.log("req", res.data.user.userType);

        setUser(res.data.user);
        setUserType(res.data.user.userType);
        // console.log(user);
      })
      .catch((error) => {
        console.log(error.response);
      });
    // handleLoadUser();
  }, []);

  // console.log("fora", user);
  console.log('Tipo do usuario ', userType);
  console.log(user);
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          width: '100%',
          position: 'fixed',
        }}
      >
        <Header
          user={user}
          pages={pages}
          isOpenDrawer={isOpenDrawer}
          setIsOpenDrawer={setIsOpenDrawer}
        />

        {userType === 'Usuario Comum' ? (
          <ResponsiveDrawerUsuarioComum
            pages={pages}
            isOpenDrawer={isOpenDrawer}
            setIsOpenDrawer={setIsOpenDrawer}
          />
        ) : userType === 'Usuario Criador de Evento' ? (
          <ResponsiveDrawerUsuarioCE
            pages={pages}
            isOpenDrawer={isOpenDrawer}
            setIsOpenDrawer={setIsOpenDrawer}
          />
        ) : (
          <ResponsiveDrawerUsuarioPalestrante
            pages={pages}
            isOpenDrawer={isOpenDrawer}
            setIsOpenDrawer={setIsOpenDrawer}
          />
        )}

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
          <Itens searchValues={searchValues} user={user} />
        </Box>
      </Box>
    </ThemeProvider>
  );
}
export default HomePageUser;
