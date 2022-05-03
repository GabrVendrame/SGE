import { ThemeProvider } from '@emotion/react';
import React, { useEffect } from 'react';
import {
  Box, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography,
} from '@mui/material';
import ScrollContainer from 'react-indiana-drag-scroll';
import api from '../services/api';
import { EventData } from './Itens';
import MuiStyles from '../styles/MuiStyles';
import '../styles/EventsBoxStyles.css';

// import { Container } from './styles';

const EventsBox: React.FC = () => {
  const [Events, setEvents] = React.useState<EventData[]>([]);
  const theme = MuiStyles;

  useEffect(() => {
    api.get('/events').then((response) => {
      setEvents(response.data);
    });
  }, []);
  return (
    <ThemeProvider theme={theme}>
      {/* <div>teste</div> */}
      <ScrollContainer className='eventsScollContainer'>
        {Events.map((event) => (
          <Card
            sx={{ background: '#1C1B1F', display: 'flex', overflow: 'initial' }}
            key={event._id}
          >
            <CardMedia
              className='cardImg'
              image={event.url}
            />
            <CardActionArea
            // disabled={disableCard}
            // onClick={(e) => handlePresentationData(presentation, e)}
            >
              <CardContent>
                <Typography gutterBottom component="div" sx={{ color: '#E6E1E5' }}>
                  {event.title}
                </Typography>
                <Typography gutterBottom variant='body2' component="div" sx={{ color: '#E6E1E5' }}>
                  Valor do ingresso - R$ {event.value?.toFixed(2)}
                </Typography>
                <Typography gutterBottom variant='body2' component="div" sx={{ color: '#E6E1E5' }}>
                  Vagas restantes - {event.remainingVacancies}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </ScrollContainer>
    </ThemeProvider>
  );
};

export default EventsBox;
