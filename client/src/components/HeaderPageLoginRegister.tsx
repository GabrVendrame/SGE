import '../styles/Header.css';
import { ThemeProvider } from '@mui/material/styles';
import { Button } from '@mui/material';
import Box from '@mui/material/Box/Box';
import { Link } from 'react-router-dom';
import ButtonStyles from '../styles/MuiStyles';
import logo from '../images/logo.png';

function Header() {
  const theme = ButtonStyles;

  return (
    <ThemeProvider theme={theme}>
      <Box className='header'>
        <Box className='logoAndName'>
          <Link to="/">
            <img src={logo} alt="S-logo" className='logo'/>
          </Link>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Box className='projectName'>SOGEI Project</Box>
          </Link>
        </Box>
          <Box className='buttonsWrapper'>
            <Button>Sobre nós</Button>
            <Button>FAQ</Button>
            <Button>Contato</Button>
          </Box>
      </Box>
    </ThemeProvider>
  );
}

export default Header;
