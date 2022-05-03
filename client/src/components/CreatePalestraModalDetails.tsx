import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {
  Button, Divider, Grid, ThemeProvider,
} from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Axios from 'axios';
import MuiStyles from '../styles/MuiStyles';
import '../styles/ProfileModalDetails.css';
import '../styles/styleTitle.css';
import '../styles/ModalDetailsStyles.css';
import { User } from '../pages/HomePageUser';
import BoxInputPadrao from './BoxInputPadrao';
import EventsBox from './EventsBox';

interface Props {
  openModalDetails: boolean;
  setOpenModalDetails: React.Dispatch<React.SetStateAction<boolean>>;
  user: User;
}

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

const CreateEventsModalDetails: React.FC<Props> = ({
  openModalDetails,
  setOpenModalDetails,
  user,
}) => {
  const theme = MuiStyles;
  // const [Presentations, setPresentations] = React.useState<PresentationData[]>([]);
  const [selectedPresentation, setSelectedPresentation] = React.useState(false);
  const [event, setEvent] = React.useState<Event>({
    title: '',
    description: '',
    img: '',
    value: 0,
    remainingVacancies: 0,
    isSingleDay: false,
    dateByDay: [
      {
        initialDate: new Date(),
        finalDate: new Date(),
      },
    ],
    url: '',
  });
  const handleClose = () => {
    setOpenModalDetails(false);
    setSelectedPresentation(false);
  };

  const validationSchema = yup.object({
    title: yup.string().required(),
    description: yup.string().required('Campo Obrigatorio'),
    remainingVacancies: yup
      .number()
      .required('Campo Obrigatorio')
      .positive('numeo negativo invalido'),
    value: yup
      .number()
      .required('Campo Obrigatorio')
      .positive('numeo negativo invalido'),
    url: yup.string().required('Campo Obrigatorio'),
  });

  const formik = useFormik({
    initialValues: event,
    onSubmit: (values) => {
      console.log('requisicao de criar um evento aqui');
      console.log(values);
      Axios.post('http://localhost:3001/api/events/CreateEvent', values)
        .then((res: any) => {
          console.log(res);
          alert('EventoCriado');
          window.location.reload();
        })
        .catch((error: any) => {
          alert('Faio');
          window.location.reload();
        });
    },

    validationSchema,
  });

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
              Criar apresentação
            </Typography>
            <Divider color="#DEC0F7" />
            <Grid container columns={{ sm: 8, md: 8 }}>
              <Grid item sm={8} md={4}>
                <Box >
                  <Typography color='secondary' sx={{ mt: 2, mb: 2 }}>
                    Eventos cadastrados por você
                  </Typography>
                  <EventsBox />
                </Box>
              </Grid>
              <Grid item md={4}>
                <Box>
                  teste
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Modal>
      </Box>
    </ThemeProvider>
  );
};

export default CreateEventsModalDetails;
