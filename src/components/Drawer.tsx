import { Box, Button, Divider } from '@mui/material';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import { ThemeProvider } from '@mui/material/styles';
import ButtonStyles from '../styles/ButtonStyles';

function Drawer() {
  const theme = ButtonStyles;
  return (
    <ThemeProvider theme={theme}>
      <Box className="drawer">
        <Divider sx={{ background: '#C3BFC3' }}/>
        <Box className="ButtonsWrapperTop">
          <Button size='large' startIcon={<HomeOutlinedIcon color='secondary'/>}>Home</Button>
          <Button size='large' startIcon={<StarOutlinedIcon color='secondary'/>}>Favoritos</Button>
          <Button size='large' startIcon={<ShoppingBagOutlinedIcon color='secondary'/>}>Minhas compras</Button>
        </Box>
        <Divider sx={{ background: '#C3BFC3' }}/>
      </Box>
    </ThemeProvider>
  );
}

export default Drawer;
