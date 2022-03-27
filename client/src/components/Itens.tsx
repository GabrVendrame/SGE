import Card from '@mui/material/Card';
import {
  Box, Button, ThemeProvider, Typography,
} from '@mui/material';
import '../styles/Itens.css';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import ButtonStyles from '../styles/ButtonStyles';
import teste1 from '../images/teste1.png';
import teste2 from '../images/trollge.jpg';
import teste3 from '../images/Screenshot_1.jpg';
import teste4 from '../images/dc9ea17b19c214cb58fe343142e1fa66f4d57153r1-1000-1000v2_00.jpg';

function Itens() {
  const theme = ButtonStyles;

  return (
    <ThemeProvider theme={theme}>
      <Box className='fullBody' >
        <Box className='itensBody'>
          <Grid container rowSpacing={'50px'} columnSpacing={2} columns={4}>
            <Grid item xs={2} >
              <Card sx={{ background: '#1C1B1F' }}>
                <CardMedia
                  component="img"
                  height="400"
                  image={teste1}
                  // alt="green iguana"
                  />
                  <CardContent>
                  <Typography gutterBottom variant="h5" component="div" sx={{ color: '#E6E1E5' }}>
                    Hamburgão goxtoso no vendrame
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ color: '#E6E1E5' }}>
                    Prontos para comer um hambur~gao aoiuj uiuuiuiu gosotososoos penis
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'flex-end' }}>
                  <Button size="small" variant='contained' color='secondary'>Compartilhar</Button>
                  <Button size="small" variant='contained' color='secondary'>Veja mais</Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid item xs={2} >
              <Card sx={{ background: '#1C1B1F' }}>
                <CardMedia
                  component="img"
                  height="400"
                  image={teste2}
                  // alt="green iguana"
                  />
                  <CardContent>
                  <Typography gutterBottom variant="h5" component="div" sx={{ color: '#E6E1E5' }}>
                    Hamburgão goxtoso no vendrame
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ color: '#E6E1E5' }}>
                    Prontos para comer um hambur~gao aoiuj uiuuiuiu gosotososoos penis
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'flex-end' }}>
                  <Button size="small" variant='contained' color='secondary'>Compartilhar</Button>
                  <Button size="small" variant='contained' color='secondary'>Veja mais</Button>
                </CardActions>
              </Card>
              </Grid>
              <Grid item xs={2} >
                <Card sx={{ background: '#1C1B1F' }}>
                <CardMedia
                  component="img"
                  height="400"
                  image={teste3}
                  // alt="green iguana"
                  />
                  <CardContent>
                  <Typography gutterBottom variant="h5" component="div" sx={{ color: '#E6E1E5' }}>
                    Hamburgão goxtoso no vendrame
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ color: '#E6E1E5' }}>
                    Prontos para comer um hambur~gao aoiuj uiuuiuiu gosotososoos penis
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'flex-end' }}>
                  <Button size="small" variant='contained' color='secondary'>Compartilhar</Button>
                  <Button size="small" variant='contained' color='secondary'>Veja mais</Button>
                </CardActions>
              </Card>
              </Grid>
              <Grid item xs={2} >
                <Card sx={{ background: '#1C1B1F' }}>
                <CardMedia
                  component="img"
                  height="400"
                  image={teste4}
                  // alt="green iguana"
                  />
                  <CardContent>
                  <Typography gutterBottom variant="h5" component="div" sx={{ color: '#E6E1E5' }}>
                    Hamburgão goxtoso no vendrame
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ color: '#E6E1E5' }}>
                    Prontos para comer um hambur~gao aoiuj uiuuiuiu gosotososoos penis
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'flex-end' }}>
                  <Button size="small" variant='contained' color='secondary'>Compartilhar</Button>
                  <Button size="small" variant='contained' color='secondary'>Veja mais</Button>
                </CardActions>
              </Card>
              </Grid>
            </Grid>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default Itens;
