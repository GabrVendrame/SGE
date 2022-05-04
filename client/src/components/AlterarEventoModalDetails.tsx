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
import BoxInputPadrao from './BoxInputPadrao';
import { EventData } from './Itens';

interface Props {
  openModalDetails: boolean;
  setOpenModalDetails: React.Dispatch<React.SetStateAction<boolean>>;
  evt: EventData;
  setAlterarEvento: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface Presentation {
  _id: string;
  title: string;
  description: string;
  img: string;
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

const AlterarEventoModalDetails: React.FC<Props> = ({
  openModalDetails,
  setOpenModalDetails,
  evt,
  setAlterarEvento,
}) => {
  const [eventoselecionado, setEventoselecionado] = React.useState<EventData>({
    _id: '',
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
        _id: '',
      },
    ],
    url: '',
  });

  const theme = MuiStyles;
  const [selectedPresentation, setSelectedPresentation] = React.useState(false);
  const handleClose = () => {
    setOpenModalDetails(false);
    setSelectedPresentation(false);
    setAlterarEvento(false);
  };

  const validationSchema = yup.object({
    title: yup.string(),
    description: yup.string(),
    remainingVacancies: yup.number(),
    value: yup.number(),
    url: yup.string(),
  });

  const validarReq = (values: EventData) => {
    if (
      values.title === ''
      && values.description === ''
      && values.remainingVacancies === -1
      && values.value === -1
    ) {
      return false;
    }
    return true;
  };

  const formik = useFormik({
    initialValues: eventoselecionado,
    onSubmit: (values) => {
      console.log(values);
      if (validarReq(values)) {
        values._id = evt._id;

        Axios.put('http://localhost:3001/api/events/updateEvent', values)
          .then((res) => {
            console.log('fon');
            alert('Evento alterado');
            window.location.reload();
          })
          .catch((error) => {
            console.log('Erro: ', error);
          });
      } else {
        console.log('Sem alteracoes');
      }
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
              {'Alterar Informações do Evento'}
            </Typography>
            <Divider color="#DEC0F7" />

            <form onSubmit={formik.handleSubmit}>
              <div className="row">
                <BoxInputPadrao
                  name={'title'}
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  tipo={'text'}
                  placeHolder={'Nome do Evento'}
                  error={formik.touched.title && Boolean(formik.errors.title)}
                  helperText={formik.touched.title && formik.errors.title}
                />
                <BoxInputPadrao
                  name={'description'}
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  tipo={'text'}
                  placeHolder={'Descricao do Evento'}
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
                Salvar
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
          </Box>
        </Modal>
      </Box>
    </ThemeProvider>
  );
};

export default AlterarEventoModalDetails;
