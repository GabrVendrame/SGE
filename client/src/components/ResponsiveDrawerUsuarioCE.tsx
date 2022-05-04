import '../styles/Drawer.css';
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import Drawer from '@mui/material/Drawer';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import LoginIcon from '@mui/icons-material/Login';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import { ThemeProvider } from '@mui/material/styles';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MuiStyles from '../styles/MuiStyles';
import CreateEventsModalDetails from './CreateEventsModalDetails';
import CreatePalestraModalDetails, {
  Presentation,
} from './CreatePalestraModalDetails';
import { User } from '../pages/HomePageUser';
import { EventData } from './Itens';
import RelatoriosModalDetails from './RelatoriosModalDetails';

const drawerWidth = 240;

interface Props {
  isOpenDrawer: boolean;
  setIsOpenDrawer: React.Dispatch<React.SetStateAction<boolean>>;
  pages: { id: number; text: string }[];
  user: User;
  events: EventData[];
  presentations: Presentation[];
}

const ResponsiveDrawerUsuarioCE: React.FC<Props> = ({
  isOpenDrawer,
  setIsOpenDrawer,
  pages,
  user,
  events,
  presentations,
}) => {
  const [criarEvento, setCriarEvento] = useState(false);
  const [criarPalestra, setCriarPalestra] = useState(false);
  const [realatorios, setRealatorios] = useState(false);
  const theme = MuiStyles;
  const [openModalDetailsPalestra, setOpenModalDetailsPalestra] = React.useState(false);

  const [openModalDetailsRelatorios, setOpenModalDetailsRelatorios] = React.useState(false);

  const handleDrawerToggle = () => {
    console.log(isOpenDrawer);
    setIsOpenDrawer(!isOpenDrawer);
    console.log(isOpenDrawer);
  };
  const [openModalDetailsEvento, setOpenModalDetailsEvento] = React.useState(false);

  const handleDrawerClick = (id: number) => {
    if (id === 1) {
      setCriarEvento(true);
      console.log(criarEvento);
      setOpenModalDetailsEvento(true);
    }
    if (id === 2) {
      console.log('mostrar aqui a tela de criar palestras');
      setCriarPalestra(true);
      console.log(criarPalestra);
      setOpenModalDetailsPalestra(true);
    }
    if (id === 3) {
      console.log(id);
      setRealatorios(true);
      setOpenModalDetailsRelatorios(true);
    }
  };
  const itensDrawer = [
    { id: 0, text: 'Home', icon: <HomeOutlinedIcon color="secondary" /> },
    {
      id: 1,
      text: 'Criar evento',
      icon: <StarOutlinedIcon color="secondary" />,
    },
    {
      id: 2,
      text: 'Criar palestra',
      icon: <StarOutlinedIcon color="secondary" />,
    },
    {
      id: 3,
      text: 'Gerenciar',
      icon: <ShoppingBagOutlinedIcon color="secondary" />,
    },
  ];

  const drawer = (
    <Box>
      <List>
        <ListItem button sx={{ display: { sm: 'none' } }}>
          <ListItemIcon>
            <LoginIcon color="secondary" />
          </ListItemIcon>
          <Link
            to={'/LoginAndRegister'}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <ListItemText primary="Login/Cadastro" />
          </Link>
        </ListItem>
        {itensDrawer.map((obj) => (
          <ListItem
            button
            onClick={() => handleDrawerClick(obj.id)}
            key={obj.id}
          >
            <ListItemIcon>{obj.icon}</ListItemIcon>
            <ListItemText primary={obj.text} />
          </ListItem>
        ))}
      </List>
      <Divider variant="middle" color="#fff" />
      <Box sx={{ display: { sm: 'none' } }}>
        <List>
          {pages.map((page) => (
            <ListItem
              button
              onClick={() => handleDrawerClick(page.id)}
              key={page.id}
            >
              <ListItemText primary={page.text} />
            </ListItem>
          ))}
        </List>
        <Divider variant="middle" color="#fff" />
      </Box>
    </Box>
  );

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="functions"
        >
          <Drawer
            className="temporaryDrawer"
            variant="temporary"
            open={isOpenDrawer}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
          >
            {drawer}
          </Drawer>
          <Drawer className="permanentDrawer" variant="permanent" open>
            {drawer}
          </Drawer>
        </Box>
      </Box>
      {criarEvento === true ? (
        <CreateEventsModalDetails
          openModalDetails={openModalDetailsEvento}
          setOpenModalDetails={setOpenModalDetailsEvento}
          user={user}
        />
      ) : (
        <></>
      )}

      {criarPalestra === true ? (
        <CreatePalestraModalDetails
          openModalDetails={openModalDetailsPalestra}
          setOpenModalDetails={setOpenModalDetailsPalestra}
          user={user}
          events={events}
        />
      ) : (
        <></>
      )}

      {realatorios === true ? (
        <RelatoriosModalDetails
          openModalDetails={openModalDetailsRelatorios}
          setOpenModalDetails={setOpenModalDetailsRelatorios}
          user={user}
          events={events}
          presentations={presentations}
        />
      ) : (
        <></>
      )}
    </ThemeProvider>
  );
};

export default ResponsiveDrawerUsuarioCE;
