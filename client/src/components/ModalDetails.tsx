import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {
  Card, CardContent, Divider, Grid, ThemeProvider,
} from '@mui/material';
import MuiStyles from '../styles/MuiStyles';
import '../styles/ModalDetailsStyles.css';
import Presentations from './Presentations';

interface EventData {
  title: string;
  description: string;
  img: string;
  value?: number;
  remainingVacancies: number;
  isSingleDay: boolean;
  dateByDay: {
    initialDate: Date;
    finalDate: Date;
  }[];
}

interface PresentationData {
  title: string;
  description: string;
  img: string;
  value?: number;
  remainingVacancies: number;
}

interface Props {
  openModalDetails: boolean;
  setOpenModalDetails: React.Dispatch<React.SetStateAction<boolean>>;
  eventData: EventData;
}

interface EventProps {
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
  });

  const handleClose = () => {
    setOpenModalDetails(false);
    setSelectedPresentation(false);
  };

  const EventSchedule: React.FC<EventProps> = ({ dateByDay }) => {
    // const dates = obj.eventData.dateByDay;
    console.log(dateByDay);
    // dateByDay.map((days) => {
    //   console.log(days);
    // });
    // return (<Box>teste</Box>);
    return (
      <Box >
        <Card sx={{ background: '#1C1B1F', display: 'flex' }}>
          {/* <CardActionArea onClick={() => handlePresentationData(presentation)}> */}
          <CardContent>
            <Box >
              <Typography gutterBottom component="div" sx={{ color: '#E6E1E5' }}>
                Dia - {dateByDay.finalDate.getDate()}
              </Typography>
            </Box>
          </CardContent>
          {/* </CardActionArea> */}
        </Card>
      </Box>

    );
  };

  // const getNumDays = (data: EventData) => {
  //   if (!data.isSingleDay) {
  //     const numDays = data.finalDate.getDate() - data.initialDate.getDate();
  //     return numDays;
  //   }
  //   return null;
  // };

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
            <Typography id="modal-modal-description" color="secondary" sx={{ mt: 2, mb: 2 }}>
              {eventData.description}
            </Typography>
            <Divider color="#DEC0F7" />
            <Grid container columnSpacing={4} columns={{ sm: 8, md: 8 }}>
              <Grid item sm={8} md={4}>
                <Box >
                  <Typography color={'rgba(255, 255, 255, 0.7)'} sx={{ mt: 2, mb: 2 }}>
                    Apresentações cadastradas
                  </Typography>
                  <Box className='presentationBox'>
                    <Presentations
                      setSelectedPresentation={setSelectedPresentation}
                      setPresentationData={setPresentationData}
                    />
                  </Box>
                </Box>
              </Grid>
              <Grid item container sm={8} md={6}>
                <Grid item sm={8} md={16}>
                  <Box>
                    <Typography color={'rgba(255, 255, 255, 0.7)'} sx={{ mt: 2, mb: 2 }}>
                      Agenda
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-evenly' }}>

                      {eventData.dateByDay.map((schedules) => (
                        <EventSchedule dateByDay={schedules} />
                      ))}
                    </Box>
                  </Box>
                </Grid>
                <Grid item sm={8} md={16}>
                  <Box>
                    {selectedPresentation
                      ? <Typography color={'rgba(255, 255, 255, 0.7)'} sx={{ mt: 2, mb: 2 }}>
                        Selecionado - {presentationData.title}
                      </Typography>
                      : null}
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Modal>
      </Box>
    </ThemeProvider>
  );
};

export default ModalDetails;
