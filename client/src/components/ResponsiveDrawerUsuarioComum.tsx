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
import React from 'react';
import { Link } from 'react-router-dom';
import MuiStyles from '../styles/MuiStyles';

const drawerWidth = 240;

interface Props {
  isOpenDrawer: boolean;
  setIsOpenDrawer: React.Dispatch<React.SetStateAction<boolean>>;
  pages: { id: number; text: string }[];
}

const ResponsiveDrawerUsuarioComum: React.FC<Props> = ({
  isOpenDrawer,
  setIsOpenDrawer,
  pages,
}) => {
  const theme = MuiStyles;
  const handleDrawerToggle = () => {
    console.log(isOpenDrawer);
    setIsOpenDrawer(!isOpenDrawer);
    console.log(isOpenDrawer);
  };

  const handleDrawerClick = (id: number) => {
    console.log(id);
  };
  const itensDrawer = [
    { id: 0, text: 'Home', icon: <HomeOutlinedIcon color="secondary" /> },
    { id: 1, text: 'Favoritos', icon: <StarOutlinedIcon color="secondary" /> },
    {
      id: 2,
      text: 'Minhas compras',
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
    </ThemeProvider>
  );
};

export default ResponsiveDrawerUsuarioComum;
