import '../styles/Home.css';
import { ThemeProvider } from '@mui/material/styles';
import { Box } from '@material-ui/core';
import Grid from '@mui/material/Grid';
import { IconButton, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import Header from '../components/Header';
import Drawer from '../components/Drawer';
import Itens from '../components/Itens';
import ButtonStyles from '../styles/ButtonStyles';
import SearchField from '../components/SearchField';

function Home() {
  const theme = ButtonStyles;
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ width: '100%' }}>
        <Grid container columns={16}>
          <Grid item xs={16}>
            <Header />
          </Grid>
          <Grid item xs={3}>
            <Drawer />
          </Grid>
          <Grid item xs={10} >
            <SearchField sx={{ marginTop: '50px' }} fullWidth placeholder='Pesquisar evento ou apresentação'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon color='secondary'/>
                      </InputAdornment>
                  ),
                  endAdornment: (
                    <IconButton>
                      <ClearIcon color='secondary'/>
                    </IconButton>
                  ),
                }}
              />
            <Grid item xs={16}>
              <Itens />
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}

export default Home;
