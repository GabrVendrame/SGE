import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {
  Button,
  Divider,
  MenuItem,
  Select,
  ThemeProvider,
} from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Axios from 'axios';
import MuiStyles from '../styles/MuiStyles';
import '../styles/ProfileModalDetails.css';
import '../styles/styleTitle.css';
import { User } from '../pages/HomePageUser';
import BoxInputPadrao from './BoxInputPadrao';
import { EventData } from './Itens';
import '../styles/CreatePalestraStyles.css';

interface Props {
  openModalDetails: boolean;
  setOpenModalDetails: React.Dispatch<React.SetStateAction<boolean>>;
  user: User;
  events: EventData[];
}

export interface Presentation {
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
  eventId: String;
}

export interface Event {
  title: String;
  description: String;
  img: String;
  value: Number;
  remainingVacancies: Number;
  isSingleDay: Boolean;
  createdBy: String;
  dateByDay: [
    {
      initialDate: Date;
      finalDate: Date;
    }
  ];
  url: String;
}

const CreatePalestraModalDetails: React.FC<Props> = ({
  openModalDetails,
  setOpenModalDetails,
  user,
  events,
}) => {
  const theme = MuiStyles;
  const [presentation, setPresentation] = React.useState<Presentation>({
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
    eventId: '',
  });
  const [selectedPresentation, setSelectedPresentation] = React.useState(false);
  const [event, setEvent] = React.useState<Event>({
    title: '',
    description: '',
    img: '',
    value: 0,
    remainingVacancies: 0,
    isSingleDay: false,
    createdBy: user.cpfCnpj,
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
    eventId: yup.string().required('Campo Obrigatorio'),
    title: yup.string().required('Campo Obrigatorio'),
    description: yup.string().required('Campo Obrigatorio'),
    remainingVacancies: yup
      .number()
      .required('Campo Obrigatorio')
      .positive('Número negativo invalido'),
    value: yup
      .number()
      .required('Campo Obrigatorio')
      .positive('Número negativo invalido'),
  });

  const formik = useFormik({
    initialValues: presentation,
    onSubmit: (values) => {
      console.log('requisicao de criar uma palestra aqui');
      console.log(values);
      Axios.post(
        'http://localhost:3001/api/presentations/CreatePresentations',
        values,
      )
        .then((res: any) => {
          console.log(res);
          alert('Palestra criada');
          window.location.reload();
        })
        .catch((error: any) => {
          alert('Erro');
        });
    },

    validationSchema,
  });

  const filteredItens = user.cpfCnpj
    ? events.filter((item: any) => {
      return item.createdBy == user.cpfCnpj.toLowerCase();
    })
    : [];

  return (
    <ThemeProvider theme={theme}>
      <Box>
        <Modal
          open={openModalDetails}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className="modalBody">
            <Typography
              id="modal-modal-title"
              className="title"
              color="secondary"
              variant="h6"
              component="h2"
            >
              {'Criar Palestra'}
            </Typography>
            <Divider color="#DEC0F7" />
            <div className="box">
              <form onSubmit={formik.handleSubmit}>
                <div className="row">
                  <Select
                    name="eventId"
                    value={formik.values.eventId}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.eventId && Boolean(formik.errors.eventId)
                    }
                    sx={{
                      textTransform: 'inherit',
                      textDecoration: 'inherit',

                      width: '100%',
                      border: '1px solid',
                      borderColor: '#C3BFC3',
                      color: '#C3BFC3',
                      paddingBottom: '10px',
                      height: '50px',
                      marginBottom: '10px',
                    }}
                  >
                    {filteredItens.map((item) => (
                      <MenuItem key={item._id} value={item._id}>
                        {item.title}
                      </MenuItem>
                    ))}
                  </Select>
                  <BoxInputPadrao
                    name={'title'}
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    tipo={'text'}
                    placeHolder={'Nome da Palestra'}
                    error={formik.touched.title && Boolean(formik.errors.title)}
                    helperText={formik.touched.title && formik.errors.title}
                  />
                  <BoxInputPadrao
                    name={'description'}
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    tipo={'text'}
                    placeHolder={'Descricao da Palestra'}
                    error={
                      formik.touched.description
                      && Boolean(formik.errors.description)
                    }
                    helperText={
                      formik.touched.description && formik.errors.description
                    }
                  />
                </div>
                <div className="row">
                  <BoxInputPadrao
                    name={'remainingVacancies'}
                    value={formik.values.remainingVacancies}
                    onChange={formik.handleChange}
                    tipo={'number'}
                    placeHolder={'Número de vagas'}
                    error={
                      formik.touched.remainingVacancies
                      && Boolean(formik.errors.remainingVacancies)
                    }
                    helperText={
                      formik.touched.remainingVacancies
                      && formik.errors.remainingVacancies
                    }
                  />
                </div>
                <div className="row">
                  <BoxInputPadrao
                    name={'value'}
                    value={formik.values.value}
                    onChange={formik.handleChange}
                    tipo={'number'}
                    placeHolder={'preco de ingresso'}
                    error={formik.touched.value && Boolean(formik.errors.value)}
                    helperText={formik.touched.value && formik.errors.value}
                  />
                </div>

                <Button
                  type="submit"
                  sx={{
                    borderRadius: '30px',
                    width: '100%',
                    paddingBottom: '10px',
                    height: '43px',
                  }}
                  color="secondary"
                  variant="contained"
                >
                  Criar
                </Button>
              </form>
              <Button
                onClick={() => handleClose()}
                sx={{
                  borderRadius: '30px',
                  width: '100%',
                  marginTop: '10px',
                  paddingBottom: '10px',
                  height: '43px',
                }}
                color="secondary"
                variant="contained"
              >
                Voltar
              </Button>
            </div>
          </Box>
        </Modal>
      </Box>
    </ThemeProvider>
  );
};

export default CreatePalestraModalDetails;
