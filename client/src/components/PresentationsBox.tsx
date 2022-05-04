import {
  Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography,
  ThemeProvider,
} from '@mui/material';
import React, { memo } from 'react';
import ScrollContainer from 'react-indiana-drag-scroll';
import MuiStyles from '../styles/MuiStyles';
import '../styles/Presentations.css';

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
  disableCard: boolean;
}
const PresentationsBox: React.FC<Props> = ({
  setSelectedPresentation,
  setPresentationData,
  Presentations,
  disableCard,
}) => {
  Presentations.forEach((presentation) => {
    presentation.dateByDay.forEach((date) => {
      date.initialDate = new Date(date.initialDate);
      date.finalDate = new Date(date.finalDate);
      return date;
    });
  });

  for (let index = 0; index < Presentations.length; index++) {
    Presentations[index].dateByDay[Presentations[index].dateByDay.length - 1]
      .finalDate.setHours(23);
  }
  const theme = MuiStyles;
  const handlePresentationData = async (obj: PresentationData, e: React.MouseEvent) => {
    e.preventDefault();
    await setPresentationData(obj);
    setSelectedPresentation(true);
  };
  return (
    <ThemeProvider theme={theme}>
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
              disabled={disableCard}
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
