import '../styles/Header.css';
import { ThemeProvider } from '@mui/material/styles';
import { Button } from '@mui/material';
import Box from '@mui/material/Box/Box';
import { Link } from 'react-router-dom';
import ButtonStyles from '../styles/ButtonStyles';
import logo from '../images/logo.png';

function Header() {
  const theme = ButtonStyles;

  return (
    <ThemeProvider theme={theme}>
      <Box className='header'>
        <Box className='logoAndName'>
          <img src={logo} alt="S-logo" className='logo'/>
          <Box className='projectName'>SOGEI Project</Box>
        </Box>
          <Box className='buttonsWrapper'>
            <Button>Sobre nós</Button>
            <Button>FAQ</Button>
            <Button>Contato</Button>
          </Box>
            <Link to={'/LoginAndRegister'}>
            <Button variant="contained" sx={{
              position: 'absolute',
              right: '10px',
              top: 15,
            }}>Login/Cadastro</Button>
            </Link>
      </Box>
    </ThemeProvider>
  );
}

export default Header;
