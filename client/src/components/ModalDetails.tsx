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
import Presentations, { PresentationData } from './PresentationsBox';
import { EventData } from './Itens';

interface Props {
  openModalDetails: boolean;
  setOpenModalDetails: React.Dispatch<React.SetStateAction<boolean>>;
  eventData: EventData;
}

interface ScheduleProps {
  dateByDay: {
    initialDate: Date;
    finalDate: Date;
  };
}

const ModalDetails: React.FC<Props> = ({
  openModalDetails,
  setOpenModalDetails,
  eventData,
}) => {
  const theme = MuiStyles;
  const [selectedPresentation, setSelectedPresentation] = React.useState(false);
  const [presentationData, setPresentationData] = React.useState<PresentationData>({
    title: '',
    description: '',
    img: '',
    remainingVacancies: 0,
    dateByDay: [{
      initialDate: new Date(),
      finalDate: new Date(),
    }],
  });

  const handleClose = () => {
    setOpenModalDetails(false);
    setSelectedPresentation(false);
  };
  const handleCardClick = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log('clique');
  };

  const ScheduleCard: React.FC<ScheduleProps> = ({ dateByDay }) => {
    // const dates = obj.eventData.dateByDay;
    // console.log(dateByDay);
    // dateByDay.map((days) => {
    //   console.log(days);
    // });
    return (
      <ThemeProvider theme={theme}>
        <CardContent>
          <Typography gutterBottom component="div" color="secondary" sx={{ minWidth: '165px' }}>
            Dia - {dateByDay.finalDate.getDate()}/{dateByDay.finalDate.getMonth()}
          </Typography>
          <Typography gutterBottom component="div" color="primary">
            Horário início - {dateByDay.initialDate.getHours()}
            :
            {dateByDay.initialDate.getMinutes()}
          </Typography>
          <Typography gutterBottom component="div" color="primary">
            Horário término - {dateByDay.finalDate.getHours()}
            :
            {dateByDay.finalDate.getMinutes()}
          </Typography>
        </CardContent>
      </ThemeProvider>
    );
  };

  const PresentationDetailsAfterClick: React.FC = () => {
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
          {presentationData.dateByDay.map((schedules) => (
            <Card className='dayCard' sx={{
              background: '#1C1B1F', display: 'flex', overflow: 'initial', minWidth: 'fit-content',
            }} >
              <ScheduleCard dateByDay={schedules} />
            </Card>
          ))}
        </ScrollContainer>
        <Box className='buttonsWapper'>
          {/* <Box sx={{ display: 'flex', justifyContent: 'space-between' }> */}
            <Button color='secondary' >Adicionar ao carrinho</Button>
            <Button color='secondary' onClick={() => console.log('trocar de div para comprar ingresso')}>Comprar ingresso</Button>
          {/* </Box> */}
        </Box>
      </ThemeProvider>
    );
  };

  return (
    <ThemeProvider theme={theme}>
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
            <Grid container columnSpacing={4} columns={{ sm: 8, md: 8 }}>
              <Grid item sm={8} md={4}>
                <Box >
                  <Typography color='secondary' sx={{ mt: 2, mb: 2 }}>
                    Apresentações cadastradas
                  </Typography>
                  <ScrollContainer className='presentationBox'>
                    <Presentations
                      setSelectedPresentation={setSelectedPresentation}
                      setPresentationData={setPresentationData}
                    />
                  </ScrollContainer>
                </Box>
              </Grid>
              <Grid item sm={8} md={4}>
                <Box className='rightGridContainer'>
                  <Box sx={{ mb: '23px' }}>
                    <Typography color='secondary' sx={{ mt: 2, mb: 2 }}>
                      Agenda do evento
                    </Typography>
                    <ScrollContainer className="eventsSchedule">
                      {eventData.dateByDay.map((schedules) => (
                        <Card sx={{
                          background: '#1C1B1F',
                          display: 'flex',
                          overflow: 'initial',
                          minWidth: 'fit-content',
                        }} >
                          <CardActionArea
                            onClick={(e) => handleCardClick(e)}>
                            <ScheduleCard dateByDay={schedules} />
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

export default ModalDetails;
