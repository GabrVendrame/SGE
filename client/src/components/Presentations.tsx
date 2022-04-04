import {
  Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography,
  ThemeProvider,
} from '@mui/material';
import React from 'react';
import MuiStyles from '../styles/MuiStyles';
import '../styles/Presentations.css';
import imgTeste from '../images/casa.jpg';

interface PresentationData {
  title: string;
  description: string;
  img: string;
  value?: number;
  remainingVacancies: number;
}

interface Props {
  setSelectedPresentation: React.Dispatch<React.SetStateAction<boolean>>;
  setPresentationData: React.Dispatch<React.SetStateAction<PresentationData>>
}
const Presentations: React.FC<Props> = ({
  setSelectedPresentation,
  setPresentationData,
}) => {
  const presentations = [
    {
      title: 'Apresentação 1',
      description: 'This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.',
      img: imgTeste,
      value: 20.00,
      remainingVacancies: 15,
    },
    {
      title: 'Apresentação 2', description: 'Descrição 2', img: imgTeste, value: 10.00, remainingVacancies: 12,
    },
    {
      title: 'Apresentação 3', description: 'Descrição 3', img: imgTeste, value: 15.00, remainingVacancies: 3,
    },
    {
      title: 'Apresentação 4', description: 'Descrição 4', img: imgTeste, value: 5.00, remainingVacancies: 5,
    },
  ];
  const theme = MuiStyles;
  const handlePresentationData = (obj: PresentationData) => {
    setPresentationData(obj);
    setSelectedPresentation(true);
  };
  return (
    <ThemeProvider theme={theme}>
      {presentations.map((presentation) => (
        <Card sx={{ background: '#1C1B1F', display: 'flex', overflow: 'initial' }}>
          <CardMedia
            // component="img"
            // width='80px'
            className='cardImg'
            image={presentation.img}
          // alt="green iguana"
          />
          <CardActionArea onClick={() => handlePresentationData(presentation)}>
            <CardContent>
              <Typography gutterBottom component="div" sx={{ color: '#E6E1E5' }}>
                {presentation.title}
              </Typography>
              <Typography gutterBottom variant='body2' component="div" sx={{ color: '#E6E1E5' }}>
                Valor do ingresso - R$ {presentation.value.toFixed(2)}
              </Typography>
              <Typography gutterBottom variant='body2' component="div" sx={{ color: '#E6E1E5' }}>
                Vagas restantes - {presentation.remainingVacancies}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions className='cardActionsDiv' sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <Button size="small" variant='text' color='secondary'>Detalhes</Button>
          </CardActions>
        </Card>
      ))}
    </ThemeProvider>
  );
};

export default Presentations;
