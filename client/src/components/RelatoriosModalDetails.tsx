import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import '../styles/EventsBoxStyles.css';
import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Divider,
  MenuItem,
  Select,
  ThemeProvider,
} from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Axios from 'axios';
import ScrollContainer from 'react-indiana-drag-scroll';
import MuiStyles from '../styles/MuiStyles';
import '../styles/ProfileModalDetails.css';
import '../styles/styleTitle.css';
import { User } from '../pages/HomePageUser';
import BoxInputPadrao from './BoxInputPadrao';
import { EventData } from './Itens';
import AlterarPalestraModalDetails from './AlterarPalestraModalDetails';
import '../styles/RelatorioStyles.css';
import AlterarEventoModalDetails from './AlterarEventoModalDetails';

interface Props {
  openModalDetails: boolean;
  setOpenModalDetails: React.Dispatch<React.SetStateAction<boolean>>;
  user: User;
  events: EventData[];
  presentations: Presentation[];
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
  _id: String;
}

const RelatoriosModalDetails: React.FC<Props> = ({
  openModalDetails,
  setOpenModalDetails,
  user,
  events,
  presentations,
}) => {
  const theme = MuiStyles;
  const [presentation, setPresentation] = React.useState<Presentation>({
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
      },
    ],
    eventId: '',
  });

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

  const [palestraselecionada, setPalestraselecionada] = React.useState<Presentation>({
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
      },
    ],
    eventId: '',
  });

  const [alterarEvento, setAlterarEvento] = React.useState(false);
  const [alterarPalestra, setAlterarPalestra] = React.useState(false);
  const [selectedPresentation, setSelectedPresentation] = React.useState(false);
  const [event, setEvent] = React.useState<EventData>({
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
  const handleClose = () => {
    setOpenModalDetails(false);
    setSelectedPresentation(false);
  };

  const handleAlterarEvento = (evnt: EventData) => {
    setAlterarEvento(true);
    console.log('tela de alterar evento');
    setEventoselecionado(evnt);
  };

  const handleAlterarPalestra = (evnt: Presentation) => {
    setAlterarPalestra(true);
    console.log('tela de alterar palestra');
    setPalestraselecionada(evnt);
  };

  const excluirPalestra = (evnt: Presentation) => {
    console.log('fazer requisicao de excluir palestra');
    const { _id } = evnt;
    console.log(_id);
    Axios.delete(
      `http://localhost:3001/api/presentations/deletePresentations/${_id}`,
    )
      .then((res) => {
        alert('Palestra removida');
        window.location.reload();
      })
      .catch((error) => {
        alert('Erro');
      });
  };

  const excluirEvento = (evnt: EventData) => {
    console.log('fazer requisicao de excluir evento');
    if (filteredItens2.length > 0) {
      console.log('Aqui');
      filteredItens2.map((item) => {
        const { _id } = item;
        console.log(_id);
        Axios.delete(
          `http://localhost:3001/api/presentations/deletePresentations/${_id}`,
        )
          .then((res) => {
            console.log('Palestra removida');
          })
          .catch((error) => {
            console.log('Erro');
          });
      });
    }
    const { _id } = evnt;
    console.log(_id);
    Axios.delete(`http://localhost:3001/api/events/deleteEvents/${_id}`)
      .then((res) => {
        alert('Evento removido');
        window.location.reload();
      })
      .catch((error) => {
        alert('Erro');
      });
  };

  console.log(presentations);
  const filteredItens = user.cpfCnpj
    ? events.filter((item: any) => {
      return item.createdBy == user.cpfCnpj.toLowerCase();
    })
    : [];

  let filteredItens2: Presentation[] = [];

  filteredItens.forEach((evt) => {
    presentations.forEach((pres) => {
      if (evt._id === pres.eventId) {
        filteredItens2.push(pres);
      }
    });
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
              {'Eventos e palestras'}
            </Typography>
            <Divider color="#DEC0F7" />
            <div className="box">
              <div className="eventos"></div>
              <div className="palestras">
                <ScrollContainer className="eventsScollContainer">
                  <div className="titulo">Eventos</div>
                  {filteredItens.map((event) => (
                    <Card
                      sx={{
                        background: '#1C1B1F',
                        display: 'flex',
                        overflow: 'initial',
                      }}
                      key={event._id}
                    >
                      <CardMedia className="cardImg" image={event.url} />
                      <CardActionArea>
                        <CardContent>
                          <Typography
                            gutterBottom
                            component="div"
                            sx={{ color: '#E6E1E5' }}
                          >
                            {event.title}
                          </Typography>
                          <Typography
                            gutterBottom
                            variant="body2"
                            component="div"
                            sx={{ color: '#E6E1E5' }}
                          >
                            Valor do ingresso - R$ {event.value?.toFixed(2)}
                          </Typography>
                          <Typography
                            gutterBottom
                            variant="body2"
                            component="div"
                            sx={{ color: '#E6E1E5' }}
                          >
                            Vagas restantes - {event.remainingVacancies}
                          </Typography>
                        </CardContent>
                        <div className="btns">
                          <Button
                            type="button"
                            onClick={() => handleAlterarEvento(event)}
                            sx={{
                              borderRadius: '15px',
                              // background: "#6750A4",
                              width: '30%',
                              paddingBottom: '10px',
                              height: '30px',
                              marginLeft: '10px',
                            }}
                            color="secondary"
                            variant="contained"
                          >
                            Alterar Evento
                          </Button>
                          <Button
                            type="button"
                            onClick={() => excluirEvento(event)}
                            sx={{
                              borderRadius: '15px',
                              width: '30%',
                              paddingBottom: '10px',
                              height: '30px',
                              marginLeft: '10px',
                            }}
                            color="secondary"
                            variant="contained"
                          >
                            Excluir Evento
                          </Button>
                        </div>
                      </CardActionArea>
                    </Card>
                  ))}
                  <div className="titulo">Palestras</div>
                  {filteredItens2.map((event) => (
                    <Card
                      sx={{
                        background: '#1C1B1F',
                        display: 'flex',
                        overflow: 'initial',
                      }}
                    >
                      <CardMedia className="cardImg" />
                      <CardActionArea>
                        <CardContent>
                          <Typography
                            gutterBottom
                            component="div"
                            sx={{ color: '#E6E1E5' }}
                          >
                            {event.title}
                          </Typography>
                          <Typography
                            gutterBottom
                            variant="body2"
                            component="div"
                            sx={{ color: '#E6E1E5' }}
                          >
                            Valor do ingresso - R$ {event.value?.toFixed(2)}
                          </Typography>
                          <Typography
                            gutterBottom
                            variant="body2"
                            component="div"
                            sx={{ color: '#E6E1E5' }}
                          >
                            Vagas restantes - {event.remainingVacancies}
                          </Typography>
                        </CardContent>
                        <div className="btns">
                          <Button
                            type="button"
                            onClick={() => handleAlterarPalestra(event)}
                            sx={{
                              borderRadius: '15px',
                              width: '30%',
                              paddingBottom: '10px',
                              height: '30px',
                              marginLeft: '10px',
                            }}
                            color="secondary"
                            variant="contained"
                          >
                            Alterar Palestra
                          </Button>
                          <Button
                            type="button"
                            onClick={() => excluirPalestra(event)}
                            sx={{
                              borderRadius: '15px',
                              width: '30%',
                              paddingBottom: '10px',
                              height: '30px',
                              marginLeft: '10px',
                            }}
                            color="secondary"
                            variant="contained"
                          >
                            Excluir Palestra
                          </Button>
                        </div>
                      </CardActionArea>
                    </Card>
                  ))}
                </ScrollContainer>
              </div>
            </div>
            {alterarPalestra === true ? (
              <AlterarPalestraModalDetails
                openModalDetails={openModalDetails}
                setOpenModalDetails={setOpenModalDetails}
                pres={palestraselecionada}
                setAlterarPalestra={setAlterarPalestra}
              />
            ) : (
              <></>
            )}
            {alterarEvento === true ? (
              <AlterarEventoModalDetails
                openModalDetails={openModalDetails}
                setOpenModalDetails={setOpenModalDetails}
                evt={eventoselecionado}
                setAlterarEvento={setAlterarEvento}
              />
            ) : (
              <></>
            )}
          </Box>
        </Modal>
      </Box>
    </ThemeProvider>
  );
};

export default RelatoriosModalDetails;
