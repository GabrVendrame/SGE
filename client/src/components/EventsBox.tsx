import { ThemeProvider } from '@emotion/react';
import React, { useCallback, useEffect } from 'react';
import {
  Box,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import ScrollContainer from 'react-indiana-drag-scroll';
import { EventData } from './Itens';
import MuiStyles from '../styles/MuiStyles';
import '../styles/EventsBoxStyles.css';

export interface Event {
  title: String;
  description: String;
  img: String;
  value: Number;
  remainingVacancies: Number;
  isSingleDay: Boolean;
  dateByDay: [
    {
      initialDate: Date;
      finalDate: Date;
    }
  ];
  url: String;
}

interface Props {
  cpfCnpj?: string;
  setSelectedEvent: React.Dispatch<React.SetStateAction<EventData>>;
  events: EventData[];
}

const EventsBox: React.FC<Props> = ({ cpfCnpj, setSelectedEvent, events }) => {
  const [Events, setEvents] = React.useState<EventData[]>([]);
  const [filterEvents, setFilterEvents] = React.useState<EventData[]>([]);
  const theme = MuiStyles;
  const filteredItens = cpfCnpj
    ? events.filter((item: any) => {
      return item.createdBy == cpfCnpj.toLowerCase();
    })
    : [];
  console.log('cpfCnpj');

  const handlePresentationData = async (
    obj: EventData,
    e: React.MouseEvent,
  ) => {
    e.preventDefault();
  };

  return (
    <ThemeProvider theme={theme}>
      <ScrollContainer className="eventsScollContainer">
        {filteredItens.map((event) => (
          <Card
            sx={{ background: '#1C1B1F', display: 'flex', overflow: 'initial' }}
            key={event._id}
          >
            <CardMedia className="cardImg" image={event.url} />
            <CardActionArea
              onClick={(e) => handlePresentationData(event, e)}
            >
              <CardContent>
                <Typography
                  gutterBottom
                  component="div"
                  sx={{ color: '#E6E1E5' }}
                >
                  {event.title}
                </Typography>
                <Typography
                  gutterBottom
                  variant="body2"
                  component="div"
                  sx={{ color: '#E6E1E5' }}
                >
                  Valor do ingresso - R$ {event.value?.toFixed(2)}
                </Typography>
                <Typography
                  gutterBottom
                  variant="body2"
                  component="div"
                  sx={{ color: '#E6E1E5' }}
                >
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
