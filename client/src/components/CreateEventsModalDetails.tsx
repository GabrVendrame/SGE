import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Button, Divider, ThemeProvider } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Axios from 'axios';
import MuiStyles from '../styles/MuiStyles';
import '../styles/ProfileModalDetails.css';
import '../styles/styleTitle.css';
import { User } from '../pages/HomePageUser';
import BoxInputPadrao from './BoxInputPadrao';

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
  createdBy: String;
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
    title: yup.string().required(),
    description: yup.string().required('Campo Obrigatorio'),
    remainingVacancies: yup
      .number()
      .required('Campo Obrigatorio')
      .positive('Numero Negativo Invalido'),
    value: yup
      .number()
      .required('Campo Obrigatorio')
      .positive('Numero Negativo Invalido'),
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
          alert('Evento Criado');
          window.location.reload();
        })
        .catch((error: any) => {
          alert('Erro');
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
          <Box className="modalBody">
            <Typography
              id="modal-modal-title"
              className="title"
              color="secondary"
              variant="h6"
              component="h2"
            >
              {'Criar Evento'}
            </Typography>
            <Divider color="#DEC0F7" />
            <div className="box">
              <form onSubmit={formik.handleSubmit}>
                <div className="row">
                  <BoxInputPadrao
                    name={'title'}
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    tipo={'text'}
                    placeHolder={'Nome do evento'}
                    error={formik.touched.title && Boolean(formik.errors.title)}
                    helperText={formik.touched.title && formik.errors.title}
                  />
                  <BoxInputPadrao
                    name={'description'}
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    tipo={'text'}
                    placeHolder={'Descricao do evento'}
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
                <div className="row">
                  <BoxInputPadrao
                    name={'url'}
                    value={formik.values.url}
                    onChange={formik.handleChange}
                    tipo={'text'}
                    placeHolder={'Url da imagem de capa'}
                    error={formik.touched.url && Boolean(formik.errors.url)}
                    helperText={formik.touched.url && formik.errors.url}
                  />
                </div>
                <div className="row">
                  <div className="title2">{'Inicio do evento'}</div>
                  <BoxInputPadrao
                    name={'initialDate'}
                    value={formik.values.dateByDay[0].initialDate}
                    onChange={formik.handleChange}
                    tipo={'date'}
                    placeHolder={''}
                    error={formik.touched.url && Boolean(formik.errors.url)}
                    helperText={formik.touched.url && formik.errors.url}
                  />
                </div>
                <div className="row">
                  <div className="title2">{'Final do evento'}</div>
                  <BoxInputPadrao
                    name={'finalDate'}
                    value={formik.values.dateByDay[0].finalDate}
                    onChange={formik.handleChange}
                    tipo={'date'}
                    placeHolder={''}
                    error={formik.touched.url && Boolean(formik.errors.url)}
                    helperText={formik.touched.url && formik.errors.url}
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

export default CreateEventsModalDetails;
