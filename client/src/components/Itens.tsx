import Card from '@mui/material/Card';
import {
  Box, Button, ThemeProvider, Typography,
} from '@mui/material';
import '../styles/Itens.css';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import ButtonStyles from '../styles/MuiStyles';
import img1 from '../images/e3.jpeg';
import img2 from '../images/f8.png';
import img3 from '../images/gio.jpg';
import img4 from '../images/tga.jpg';

function Itens() {
  const theme = ButtonStyles;
  const itens = [
    {
      id: 0, title: 'Titulo 1', description: 'Descrição 1', img: img1,
    },
    {
      id: 1, title: 'Titulo 2', description: 'Descrição 2', img: img2,
    },
    {
      id: 2, title: 'Titulo 3', description: 'Descrição 3', img: img3,
    },
    {
      id: 3, title: 'Titulo 4', description: 'Descrição 4', img: img4,
    },
  ];
  return (
    <ThemeProvider theme={theme}>
      <Box className='fullBody' >
        <Box className='itensBody'>
          <Grid container rowSpacing={'50px'} columnSpacing={2} columns={{ xs: 2, sm: 4, md: 6 }}>
            {itens.map((item) => (
              <Grid item xs={2} sm={4} md={3} >
                <Card sx={{ background: '#1C1B1F' }}>
                  <CardMedia
                    component="img"
                    height="400"
                    image={item.img}
                  // alt="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div" sx={{ color: '#E6E1E5' }}>
                      {item.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ color: '#E6E1E5' }}>
                      {item.description}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ justifyContent: 'flex-end' }}>
                    <Button size="small" variant='contained' color='secondary'>Compartilhar</Button>
                    <Button size="small" variant='contained' color='secondary'>Veja mais</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default Itens;
