import '../App.css';
import { ThemeProvider } from '@mui/material/styles';
import { Button } from '@mui/material';
import Box from '@mui/material/Box/Box';
import ButtonStyles from '../styles/ButtonStyles';
import logo from '../images/logo.png';

function Header() {
  const theme = ButtonStyles;
  return (
    <ThemeProvider theme={theme}>
      <Box className='header'>
        <img src={logo} alt="S-logo" className='logo'/>
        <Box className='projectName'>
          SOGEI Project
        </Box>
          <Box className='buttonsWrapper'>
            <Button>Sobre nós</Button>
            <Button>FAQ</Button>
            <Button>Contato</Button>
          </Box>
        <Button className='loginButton' variant="contained" >Login/Cadastro</Button>
      </Box>
    </ThemeProvider>
  );
}

export default Header;
