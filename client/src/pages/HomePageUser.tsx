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
import Itens, { EventData } from '../components/Itens';
import ButtonStyles from '../styles/MuiStyles';
import SearchField from '../components/SearchField';
import ResponsiveDrawerUsuarioComum from '../components/ResponsiveDrawerUsuarioComum';
import api from '../services/api';
import ResponsiveDrawerUsuarioPalestrante from '../components/ResponsiveDrawerUsuarioPalestrante';
import ResponsiveDrawerUsuarioCE from '../components/ResponsiveDrawerUsuarioCE';

export interface User {
  name: string;
  email: string;
  password: string;
  cpfCnpj: string;
  cell: string;
  userType: string;
  userRegisteredEvents: [
    {
      eventId: string;
      numEventTickets: number;
      userRegisteredPresentationsId: [
        {
          presentationId: string;
          numPresTickets: number;
        }
      ];
    }
  ];
}

export interface Presentation {
  title: String;
  description: String;
  img: String;
  value: Number;
  remainingVacancies: Number;
  isSingleDay: Boolean;
  dateByDay: [
    {
      initialDate: Date;
      finalDate: Date;
    }
  ];
  eventId: String;
}

function HomePageUser() {
  const [Events, setEvents] = React.useState<EventData[]>([]);
  const [presentation, setPresentation] = React.useState<Presentation[]>([]);
  const theme = ButtonStyles;
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [searchValues, setSearchValues] = useState('');
  const [userType, setUserType] = useState('');
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValues(event.target.value);
  };
  const [user, setUser] = useState<User>({
    name: '',
    email: '',
    password: '',
    cpfCnpj: '',
    cell: '',
    userType: '',
    userRegisteredEvents: [
      {
        eventId: '',
        numEventTickets: 0,
        userRegisteredPresentationsId: [
          {
            presentationId: '',
            numPresTickets: 0,
          },
        ],
      },
    ],
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
        setUser(res.data.user);
        setUserType(res.data.user.userType);
        if (res.data.user.userType === 'Usuario Criador de Evento') {
          api.get('/events').then((response) => {
            setEvents(response.data);
          });
          api.get('/presentations').then((response) => {
            setPresentation(response.data);
          });
        }
      })
      .catch((error) => {
      });
  }, []);

  console.log(Events);
  console.log(presentation);
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
            user={user}
            events={Events}
            presentations={presentation}
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
          <Itens searchValues={searchValues} user={user} setUser={setUser} />
        </Box>
      </Box>
    </ThemeProvider>
  );
}
export default HomePageUser;
