import Card from '@mui/material/Card';
import {
  Alert,
  Box,
  Button,
  Snackbar,
  ThemeProvider,
  Typography,
} from '@mui/material';
import '../styles/Itens.css';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import React from 'react';
import api from '../services/api';
import MuiStyles from '../styles/MuiStyles';
import { User } from '../pages/HomePageUser';
import { PresentationData } from './PresentationsBox';
import ModalDetails from './ModalDetails';

export interface EventData {
  _id: string;
  title: string;
  description: string;
  img: string;
  value?: number;
  remainingVacancies: number;
  isSingleDay: boolean;
  dateByDay: {
    initialDate: Date;
    finalDate: Date;
    _id: string;
  }[];
  url: string;
}

interface Props {
  searchValues: string;
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}
interface EventProps {
  itensData: EventData;
}

const Itens: React.FC<Props> = ({ searchValues, user, setUser }) => {
  const [openModalDetails, setOpenModalDetails] = React.useState(false);
  const [Events, setEvents] = React.useState<EventData[]>([]);
  const [Presentations, setPresentations] = React.useState<PresentationData[]>(
    [],
  );

  const [itensData, setItensData] = React.useState<EventData>({
    _id: '',
    title: '',
    description: '',
    img: '',
    value: 0.0,
    remainingVacancies: 0,
    isSingleDay: true,
    dateByDay: [
      {
        initialDate: new Date(),
        finalDate: new Date(),
        _id: '',
      },
    ],
    url: '',
  });

  React.useEffect(() => {
    api.get('/events').then((response) => {
      setEvents(response.data);
    });
  }, []);

  Events.forEach((event) => {
    event.dateByDay.forEach((date) => {
      date.initialDate = new Date(date.initialDate);
      date.finalDate = new Date(date.finalDate);
      return date;
    });
  });
  const theme = MuiStyles;

  // só seta o valor 9 no último dia caso o evento durar mais que um dia
  for (let index = 0; index < Events.length; index++) {
    if (!Events[index].isSingleDay) {
      Events[index].dateByDay[
        Events[index].dateByDay.length - 1
      ].finalDate.setDate(15);
    }
  }

  const EventsDate = (props: EventProps) => {
    const eventsDate = props.itensData.dateByDay;
    const firstDay = eventsDate[0].initialDate.getDate();
    const lastDay = eventsDate[eventsDate.length - 1].finalDate.getDate();

    return <Typography>{`Data: ${firstDay}/${lastDay}`}</Typography>;
  };

  const filteredItens = searchValues
    ? Events.filter((item: any) => {
      return item.title.toLowerCase().includes(searchValues.toLowerCase());
    })
    : Events;
  const HandleOpenModalDetails = (obj: EventData) => {
    api
      .get(`/presentations/registeredPresentations/${obj._id}`)
      .then((response) => {
        setPresentations(response.data);
      });
    setOpenModalDetails(true);
    setItensData(obj);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box className="itensBody">
        <Grid
          container
          rowSpacing={'50px'}
          columnSpacing={2}
          columns={{ xs: 2, sm: 4, md: 6 }}
        >
          {filteredItens.map((item) => (
            <Grid item xs={2} sm={4} md={3} key={item._id}>
              <Card sx={{ background: '#1C1B1F' }}>
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    sx={{ color: '#E6E1E5' }}
                  >
                    {item.title}
                  </Typography>
                </CardContent>
                <CardMedia
                  component="img"
                  height="400"
                  image={item.url}
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="body1"
                    component="div"
                    sx={{ color: '#E6E1E5' }}
                  >
                    <EventsDate itensData={item} />
                  </Typography>
                  <Typography
                    gutterBottom
                    variant="body1"
                    component="div"
                    sx={{ color: '#E6E1E5' }}
                  >
                    Valor do ingreso: {item.value?.toFixed(2)}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ color: '#E6E1E5' }}
                  >
                    {item.description}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'flex-end' }}>
                  <Button size="small" variant="contained" color="secondary">
                    Compartilhar
                  </Button>
                  <Button
                    size="small"
                    variant="contained"
                    color="secondary"
                    onClick={() => HandleOpenModalDetails(item)}
                  >
                    Veja mais
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
        <ModalDetails
          openModalDetails={openModalDetails}
          setOpenModalDetails={setOpenModalDetails}
          eventData={itensData}
          Presentations={Presentations}
          user={user}
          setUser={setUser}
        />
      </Box>
    </ThemeProvider>
  );
};

export default Itens;
