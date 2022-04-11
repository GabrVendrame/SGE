import {
  Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography,
  ThemeProvider,
} from '@mui/material';
import React from 'react';
import MuiStyles from '../styles/MuiStyles';
import '../styles/Presentations.css';
import imgTeste from '../images/casa.jpg';
import api from '../services/api';

export interface PresentationData {
  title: string;
  description: string;
  img: string;
  value?: number;
  remainingVacancies: number;
  dateByDay: {
    initialDate: Date;
    finalDate: Date;
  }[];
}

interface Props {
  setSelectedPresentation: React.Dispatch<React.SetStateAction<boolean>>;
  setPresentationData: React.Dispatch<React.SetStateAction<PresentationData>>
}
const PresentationsBox: React.FC<Props> = ({
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
      dateByDay: [{
        initialDate: new Date(),
        finalDate: new Date(),
      }],
    },
    {
      title: 'Apresentação 2',
      description: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas',
      img: imgTeste,
      value: 10.00,
      remainingVacancies: 12,
      dateByDay: [{
        initialDate: new Date(),
        finalDate: new Date(),
      }],
    },
    {
      title: 'Apresentação 3',
      description: 'Descrição 3',
      img: imgTeste,
      value: 15.00,
      remainingVacancies: 3,
      dateByDay: [{
        initialDate: new Date(),
        finalDate: new Date(),
      }],
    },
    {
      title: 'Apresentação 4',
      description: 'Descrição 4',
      img: imgTeste,
      value: 5.00,
      remainingVacancies: 5,
      dateByDay: [{
        initialDate: new Date(),
        finalDate: new Date(),
      }],
    },
  ];

  const [Presentations, setPresentations] = React.useState<PresentationData[]>([]);

  React.useEffect(() => {
    api.get('/presentations').then((response) => {
      setPresentations(response.data);
    });
  }, []);

  // formata para o tipo Date
  Presentations.forEach((presentation) => {
    presentation.dateByDay.forEach((date) => {
      date.initialDate = new Date(date.initialDate);
      date.finalDate = new Date(date.finalDate);
      return date;
    });
  });

  for (let index = 0; index < Presentations.length; index++) {
    // console.log('teste');
    Presentations[index].dateByDay[Presentations[index].dateByDay.length - 1]
      .finalDate.setHours(23);
  }
  console.log(Presentations);
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

export default PresentationsBox;
