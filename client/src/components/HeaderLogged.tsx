import '../styles/Header.css';
import { ThemeProvider } from '@mui/material/styles';
import {
  AppBar, Button, IconButton, Toolbar,
} from '@mui/material';
import Box from '@mui/material/Box/Box';
import { Link, useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import React from 'react';
import { User } from '../pages/HomePageUser';
import MuiStyles from '../styles/MuiStyles';
import logo from '../images/logo.png';
import ModalDetails from './ProfileModalDetails';

interface Props {
  isOpenDrawer: boolean;
  setIsOpenDrawer: React.Dispatch<React.SetStateAction<boolean>>;
  pages: { id: number; text: string }[];
  user: User;
}

const HeaderLogged: React.FC<Props> = ({
  user,
  isOpenDrawer,
  setIsOpenDrawer,
  pages,
}) => {
  const theme = MuiStyles;
  const navigate = useNavigate();
  const [openModalDetails, setOpenModalDetails] = React.useState(false);
  const logout = () => {
    localStorage.removeItem('token');
    console.log('saindo');
    alert('Saindo');
    navigate('/');
  };

  const handleOpenNavMenu = () => {
    setIsOpenDrawer(!isOpenDrawer);
  };

  const handlePageSelect = (id: number) => {
    console.log(id);
  };

  const HandleOpenModalDetails = () => {
    setOpenModalDetails(true);
    console.log('fon');
  };

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static">
        <Toolbar disableGutters>
          <Box
            className="logoAndName"
            sx={{ display: { xs: 'none', sm: 'flex' } }}
          >
            <Link to="/HomeUser">
              <img src={logo} alt="S-logo" className="logo" />
            </Link>
            <Link
              to="/HomeUser"
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <Box className="projectName">SOGEI Project</Box>
            </Link>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', sm: 'none' } }}>
            <IconButton
              size="small"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', sm: 'none' } }}>
            <Link to="/HomeUser">
              <img src={logo} alt="S-logo" className="logo" />
            </Link>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', sm: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.id}
                onClick={() => handlePageSelect(page.id)}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page.text}
              </Button>
            ))}
          </Box>

          <Button
            onClick={() => logout()}
            color="secondary"
            variant="contained"
            sx={{
              display: { xs: 'none', sm: 'flex' },
              position: 'absolute',
              right: '10px',
              top: 15,
            }}
          >
            Sair
          </Button>
          <Button
            onClick={() => HandleOpenModalDetails()}
            color="secondary"
            variant="contained"
            sx={{
              display: { xs: 'none', sm: 'flex' },
              position: 'absolute',
              right: '80px',
              top: 15,
            }}
          >
            Minha conta
          </Button>
        </Toolbar>
        <ModalDetails
          user={user}
          openModalDetails={openModalDetails}
          setOpenModalDetails={setOpenModalDetails}
        />
      </AppBar>
    </ThemeProvider>
  );
};

export default HeaderLogged;
