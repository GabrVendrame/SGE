import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ScrollContainer from 'react-indiana-drag-scroll';
import {
  Alert,
  Button,
  Card, CardActionArea, CardContent, Grid, Portal, Snackbar, ThemeProvider,
} from '@mui/material';
import Collapse from '@mui/material/Collapse';
import BoxBuyTicket from './BoxBuyTicket';
import MuiStyles from '../styles/MuiStyles';
import '../styles/ModalDetailsStyles.css';
import { User } from '../pages/HomePageUser';
import PresentationsBox, { PresentationData } from './PresentationsBox';
import { EventData } from './Itens';
import api from '../services/api';

interface Props {
  eventData: EventData;
  Presentations: PresentationData[];
  selectedPresentation: boolean;
  setSelectedPresentation: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenOkAlert: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenAlert: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenConfirmDialog: React.Dispatch<React.SetStateAction<boolean>>;
  setIsPresRegistered: React.Dispatch<React.SetStateAction<boolean>>;
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}

interface ScheduleProps {
  _id?: string;
  initialDate: Date;
  finalDate: Date;
}

const GridsModalDetails: React.FC<Props> = ({
  eventData,
  Presentations,
  selectedPresentation,
  setSelectedPresentation,
  setOpenOkAlert,
  user,
  setOpenConfirmDialog,
  setIsPresRegistered,
  setOpenAlert,
  setUser,
}) => {
  const theme = MuiStyles;
  const [presentationData, setPresentationData] = React.useState<PresentationData>({
    _id: '',
    title: '',
    description: '',
    img: '',
    value: 0,
    remainingVacancies: 0,
    dateByDay: [{
      initialDate: new Date(),
      finalDate: new Date(),
      _id: '',
    }],
  });

  const [showBoxBuyTicket, setShowBoxBuyTicket] = React.useState<boolean>(false);

  const handleDayClick = (e: React.MouseEvent, teste: ScheduleProps) => {
    e.preventDefault();
    console.log(teste);
  };

  const ScheduleCard = (presentationDate: ScheduleProps) => {
    return (
      <ThemeProvider theme={theme}>
        <CardContent>
          <Typography gutterBottom component="div" color="secondary" sx={{ minWidth: '165px' }}>
            Dia - {presentationDate.finalDate.getDate()}/{presentationDate.finalDate.getMonth()}
          </Typography>
          <Typography gutterBottom component="div" color="primary">
            Horário início - {presentationDate.initialDate.getHours()}
            :
            {presentationDate.initialDate.getMinutes()}
          </Typography>
          <Typography gutterBottom component="div" color="primary">
            Horário término - {presentationDate.finalDate.getHours()}
            :
            {presentationDate.finalDate.getMinutes()}
          </Typography>
        </CardContent>
      </ThemeProvider>
    );
  };

  const changeRightGrid = () => {
    // setPresentationDetailsDisplay('none');
    // if (rightContainerGridRef.current != null) {
    //   rightContainerGridRef.current.style.display = 'none';
    //   if (rightContainerGridRef.current.style.display === 'none') {
    //     setBoxBuyTicketDisplay('flex');
    //   }
    // }

    if (user) {
      api.get(
        `/users/find/${user.cpfCnpj}`,
      ).then((res) => {
        setUser(res.data.user);
      }).catch((error) => {
        console.log(error.response);
      });

      if (user.userType === 'Usuario Comum') {

        if (user.userRegisteredEvents.some((e) => e.eventId === eventData._id)) {
          // console.log('existe');
          setOpenAlert(true);
        }

        if (user.userRegisteredEvents.some((e) =>
          e.userRegisteredPresentationsId.some((a) =>
            a.presentationId === presentationData._id))) {
          setIsPresRegistered(true);
        }
        setShowBoxBuyTicket(true);
      } else {
        setOpenConfirmDialog(true);
      }
    } else {
      setOpenConfirmDialog(true);
    }

  };

  const PresentationDetailsAfterClick = React.memo(() => {
    return (
      <ThemeProvider theme={theme}>
        <ScrollContainer className='presentationDetails'>

          <Typography color='secondary' sx={{ mb: 2 }} >
            Descrição da apresentação
          </Typography>
          <Typography variant='body2' color={'rgba(255, 255, 255, 0.7)'}>
            {presentationData.description}
          </Typography>
          <Typography color='secondary' sx={{ mt: 2, mb: 2 }}>
            Agenda da apresentação
          </Typography>
          {presentationData.dateByDay.map((PresentationSchedules) => (
            <Card className='dayCard' sx={{
              background: '#1C1B1F', display: 'flex', overflow: 'initial', minWidth: 'fit-content',
            }}
              key={PresentationSchedules._id}>
              {ScheduleCard(PresentationSchedules)}
            </Card>
          ))}
        </ScrollContainer>

      </ThemeProvider>
    );
  });

  const InfoSection = (open: boolean) => {
    return (
      <>
        <Box sx={{ mb: '23px' }}>
          <Typography color='secondary' sx={{ mt: 2, mb: 2 }}>
            Agenda do evento
          </Typography>
          <ScrollContainer className="eventsSchedule">
            {eventData.dateByDay.map((eventSchedules) => (
              <Card sx={{
                background: '#1C1B1F',
                display: 'flex',
                overflow: 'initial',
                minWidth: 'fit-content',
              }}
                key={eventSchedules._id}>
                <CardActionArea
                  onClick={(e) => handleDayClick(e, eventSchedules)}>
                  {ScheduleCard(eventSchedules)}
                </CardActionArea>
              </Card>
            ))}
          </ScrollContainer>
        </Box>
        <Collapse in={open}
          className="collapseContainer"
        >
          <PresentationDetailsAfterClick />
        </Collapse >
        <Box className='buttonsWapper'>
          <Button color='secondary' >Adicionar ao carrinho</Button>
          <Button color='secondary' onClick={() => changeRightGrid()}>Comprar ingresso</Button>
        </Box>
      </>
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container columnSpacing={4} columns={{ sm: 8, md: 8 }}>
        <Grid item sm={8} md={4}>
          <Box >
            <Typography color='secondary' sx={{ mt: 2, mb: 2 }}>
              Apresentações cadastradas
            </Typography>
            <PresentationsBox
              setSelectedPresentation={setSelectedPresentation}
              setPresentationData={setPresentationData}
              Presentations={Presentations}
              disableCard={showBoxBuyTicket} />
          </Box>
        </Grid>
        <Grid item sm={8} md={4}>
          <Box
            className='rightGridContainer'>
            {showBoxBuyTicket
              ? < BoxBuyTicket
                setShowComponent={setShowBoxBuyTicket}
                presentationData={presentationData}
                eventData={eventData}
                user={user}
                setUser={setUser}
                setOpenOkAlert={setOpenOkAlert}
              />
              : InfoSection(selectedPresentation)}
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default React.memo(GridsModalDetails);
