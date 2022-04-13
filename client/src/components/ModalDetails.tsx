import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import ScrollContainer from 'react-indiana-drag-scroll';
import {
  Button,
  Card, CardActionArea, CardContent, Divider, Grid, ThemeProvider,
} from '@mui/material';
import MuiStyles from '../styles/MuiStyles';
import '../styles/ModalDetailsStyles.css';
import PresentationsBox, { PresentationData } from './PresentationsBox';
import { EventData } from './Itens';

interface Props {
  openModalDetails: boolean;
  setOpenModalDetails: React.Dispatch<React.SetStateAction<boolean>>;
  eventData: EventData;
  Presentations: PresentationData[];
}

interface ScheduleProps {
  _id?: string;
  initialDate: Date;
  finalDate: Date;

}

const ModalDetails: React.FC<Props> = ({
  openModalDetails,
  setOpenModalDetails,
  eventData,
  Presentations,
}) => {
  const theme = MuiStyles;
  const [selectedPresentation, setSelectedPresentation] = React.useState(false);
  // const [Presentations, setPresentations] = React.useState<PresentationData[]>([]);
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

  const handleClose = () => {
    setOpenModalDetails(false);
    setSelectedPresentation(false);
  };
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
              key={PresentationSchedules._id}
            >
              {/* <ScheduleCard dateByDay={PresentationSchedules} /> */}
              {ScheduleCard(PresentationSchedules)}

            </Card>
          ))}
        </ScrollContainer>
        <Box className='buttonsWapper'>
          <Button color='secondary' >Adicionar ao carrinho</Button>
          <Button color='secondary' onClick={() => console.log('trocar de div para comprar ingresso')}>Comprar ingresso</Button>
        </Box>
      </ThemeProvider>
    );
  });

  return (
    <ThemeProvider theme={theme}>
        {console.log('teste')}
      <Box>
        <Modal
          open={openModalDetails}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          >
          <Box className='modalBody'>
            <Typography id="modal-modal-title" className='title' color="secondary" variant="h6" component="h2">
              {eventData.title}
            </Typography>
            <Divider color="#DEC0F7" />
            <Typography id="modal-modal-description" color='rgba(255, 255, 255, 0.7)' sx={{ mt: 2, mb: 2 }}>
              {eventData.description}
            </Typography>
            <Divider color="#DEC0F7" />
            <Grid container columnSpacing={4} columns={{ sm: 8, md: 8 }}
              key={presentationData._id}
            >
              <Grid item sm={8} md={4}>
                <Box >
                  <Typography color='secondary' sx={{ mt: 2, mb: 2 }}>
                    Apresentações cadastradas
                  </Typography>
                  {/* <ScrollContainer className='presentationBox'> */}
                    <PresentationsBox
                      setSelectedPresentation={setSelectedPresentation}
                      setPresentationData={setPresentationData}
                      // eventId={eventData._id}
                      Presentations={Presentations}
                    />
                  {/* </ScrollContainer> */}
                </Box>
              </Grid>
              <Grid item sm={8} md={4}>
                <Box className='rightGridContainer'>
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
                          key={eventSchedules._id}
                        >
                          {/* {console.log((eventData.dateByDay))} */}
                          <CardActionArea
                            onClick={(e) => handleDayClick(e, eventSchedules)}>
                            {/* <ScheduleCard dateByDay={eventSchedules} /> */}
                            {ScheduleCard(eventSchedules)}
                          </CardActionArea>
                        </Card>
                      ))}
                    </ScrollContainer>
                  </Box>
                  {selectedPresentation
                    ? <PresentationDetailsAfterClick />
                    : null}
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Modal>
      </Box >
    </ThemeProvider >
  );
};

export default (ModalDetails);
