import {
  Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography,
  ThemeProvider,
} from '@mui/material';
import React, { memo } from 'react';
import ScrollContainer from 'react-indiana-drag-scroll';
import MuiStyles from '../styles/MuiStyles';
import '../styles/Presentations.css';

// import imgTeste from '../images/casa.jpg';
// import api from '../services/api';

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
  Presentations: PresentationData[];
}
// const PresentationsBox: React.FC<Props> = ({
//   setSelectedPresentation,
//   setPresentationData,
// }) => {
const PresentationsBox: React.FC<Props> = ({
  setSelectedPresentation,
  setPresentationData,
  Presentations,
}) => {
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
  const handlePresentationData = (obj: PresentationData, e: React.MouseEvent) => {
    e.preventDefault();
    // console.log()
    setPresentationData(obj);
    setSelectedPresentation(true);
  };

  return (
    <ThemeProvider theme={theme}>
      {/* {console.log('teste')} */}
        <ScrollContainer className='presentationBox'>
          {Presentations.map((presentation) => (
            <Card
              sx={{ background: '#1C1B1F', display: 'flex', overflow: 'initial' }}
              key={presentation._id}
            >
              <CardMedia
                className='cardImg'
                image={presentation.img}
              />
              <CardActionArea
                onClick={(e) => handlePresentationData(presentation, e)}
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
        </ScrollContainer>
    </ThemeProvider >
  );
};

export default memo(PresentationsBox);
