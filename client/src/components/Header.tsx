import '../styles/Header.css';
import { ThemeProvider } from '@mui/material/styles';
import {
  AppBar, Button, IconButton, Toolbar,
} from '@mui/material';
import Box from '@mui/material/Box/Box';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import React from 'react';
import MuiStyles from '../styles/MuiStyles';
import logo from '../images/logo.png';

interface Props {
  isOpenDrawer: boolean;
  setIsOpenDrawer: React.Dispatch<React.SetStateAction<boolean>>;
  pages: { id: number, text: string }[];
}

const Header: React.FC<Props> = ({
  isOpenDrawer,
  setIsOpenDrawer,
  pages,
}) => {
  const theme = MuiStyles;

  const handleOpenNavMenu = () => {
    setIsOpenDrawer(!isOpenDrawer);
  };

  const handlePageSelect = (id: number) => {
    console.log(id);
  };

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static">
        <Toolbar disableGutters>
          <Box className='logoAndName' sx={{ display: { xs: 'none', sm: 'flex' } }}>
            <Link to="/">
              <img src={logo} alt="S-logo" className='logo' />
            </Link>
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Box className='projectName'>SOGEI Project</Box>
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
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', sm: 'none' } }}
          >
            <Link to="/">
              <img src={logo} alt="S-logo" className='logo' />
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
          <Link to={'/LoginAndRegister'}>
            <Button color="secondary" variant="contained" sx={{
              display: { xs: 'none', sm: 'flex' },
              position: 'absolute',
              right: '10px',
              top: 15,
            }}>Login/Cadastro</Button>
          </Link>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;
