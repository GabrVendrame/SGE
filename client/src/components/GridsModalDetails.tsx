import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ScrollContainer from 'react-indiana-drag-scroll';
import {
  Button,
  Card, CardActionArea, CardContent, Grid, ThemeProvider,
} from '@mui/material';
import Collapse from '@mui/material/Collapse';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { BoxTypeMap } from '@mui/system';
import BoxBuyTicket from './BoxBuyTicket';
import MuiStyles from '../styles/MuiStyles';
import '../styles/ModalDetailsStyles.css';
import PresentationsBox, { PresentationData } from './PresentationsBox';
import { EventData } from './Itens';

interface Props {
  eventData: EventData;
  Presentations: PresentationData[];
  selectedPresentation: boolean;
  setSelectedPresentation: React.Dispatch<React.SetStateAction<boolean>>;
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

  const [boxBuyTicketDisplay, setBoxBuyTicketDisplay] = React.useState<string>('none');
  const [presentationDetailsDisplay, setPresentationDetailsDisplay] = React.useState<string>('flex');
  const rightContainerGridRef = React.useRef<any>(null)!;

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
    if (rightContainerGridRef.current != null) {
      rightContainerGridRef.current.style.display = 'none';
      if (rightContainerGridRef.current.style.display === 'none') {
        setBoxBuyTicketDisplay('flex');
      }
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
        <Box className='buttonsWapper'>
          <Button color='secondary' >Adicionar ao carrinho</Button>
          <Button color='secondary' onClick={() => changeRightGrid()}>Comprar ingresso</Button>
        </Box>
      </ThemeProvider>
    );
  });

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
              Presentations={Presentations} />
          </Box>
        </Grid>
        <Grid item sm={8} md={4}>
          <Box ref={rightContainerGridRef} className='rightGridContainer'>
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
            <Collapse in={selectedPresentation}>
              <PresentationDetailsAfterClick />
            </Collapse >
          </Box>
          <BoxBuyTicket
            boxBuyTicketDisplay={boxBuyTicketDisplay}
            setBoxBuyTicketDisplay={setBoxBuyTicketDisplay}
            rightContainerGridRef={rightContainerGridRef}
          />
        </Grid>
      </Grid>

    </ThemeProvider>
  );
};

export default GridsModalDetails;
