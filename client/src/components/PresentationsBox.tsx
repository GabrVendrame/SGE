import {
  Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography,
  ThemeProvider,
} from '@mui/material';
import React from 'react';
import MuiStyles from '../styles/MuiStyles';
import '../styles/Presentations.css';
// import imgTeste from '../images/casa.jpg';
import api from '../services/api';

export interface PresentationData {
  _id: string;
  title: string;
  description: string;
  img: string;
  value: number;
  remainingVacancies: number;
  dateByDay: {
    initialDate: Date;
    finalDate: Date;
    _id: string;
  }[];
}

interface Props {
  setSelectedPresentation: React.Dispatch<React.SetStateAction<boolean>>;
  setPresentationData: React.Dispatch<React.SetStateAction<PresentationData>>
  eventId: string;
}
const PresentationsBox: React.FC<Props> = ({
  setSelectedPresentation,
  setPresentationData,
  eventId,
}) => {
  const [Presentations, setPresentations] = React.useState<PresentationData[]>([]);

  React.useEffect(() => {
    console.log(Presentations);
    api.get(`/presentations/registeredPresentations/${eventId}`).then((response) => {
      setPresentations(response.data);
      console.log('teste');
    });
  }, []);
  // console.log(Presentations);

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
  // console.log(Presentations);
  const theme = MuiStyles;
  const handlePresentationData = (obj: PresentationData) => {
    // setTeste(obj);
    setPresentationData(obj);
    // console.log(teste);
    setSelectedPresentation(true);
  };
  return (
    <ThemeProvider theme={theme}>
      {Presentations.map((presentation) => (
        <Card
          sx={{ background: '#1C1B1F', display: 'flex', overflow: 'initial' }}
          key={presentation._id}
        >
          <CardMedia
            // component="img"
            // width='80px'
            className='cardImg'
            image={presentation.img}
          // alt="green iguana"
          />
          <CardActionArea
          onClick={() => handlePresentationData(presentation)}
          >
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
