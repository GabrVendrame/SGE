import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  ThemeProvider,
  Tooltip,
  Typography,
} from '@mui/material';
import * as React from 'react';
import '../styles/BoxBuyTicket.css';
import ScrollContainer from 'react-indiana-drag-scroll';
import TextField from '@mui/material/TextField';
import MuiStyles from '../styles/MuiStyles';
import { PresentationData } from './PresentationsBox';
import { EventData } from './Itens';
import api from '../services/api';
import { User } from '../pages/HomePageUser';

interface Props {
  setShowComponent: React.Dispatch<React.SetStateAction<boolean>>
  setOpenOkAlert: React.Dispatch<React.SetStateAction<boolean>>
  presentationData: PresentationData;
  eventData: EventData;
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>
}
interface TicketsData {
  eventTicket: number,
  presentationTicket: number,
}

const BoxBuyTicket: React.FC<Props> = ({
  setShowComponent,
  setOpenOkAlert,
  presentationData,
  eventData,
  user,
  setUser,
}) => {
  const [ticketData, setTicketData] = React.useState<TicketsData>({
    eventTicket: 0,
    presentationTicket: 0,
  });
  const [registeredTickets, setRegisteredTickets] = React.useState<TicketsData>({
    eventTicket: 0,
    presentationTicket: 0,
  });
  const [openConfirmDialog, setOpenConfirmDialog] = React.useState(false);
  const theme = MuiStyles;

  const changeRightGrid = () => {
    setShowComponent(false);
  };

  const handleCloseConfirmDialog = () => {
    setOpenConfirmDialog(false);
  };

  const handleOpenConfirmDialog = () => {
    setOpenConfirmDialog(true);
  };

  const buyTicket = () => {
    if (presentationData._id === '' || ticketData.presentationTicket === 0) {
      const data = {
        eventId: eventData._id,
        userEmail: user.email,
        numEventTickets: ticketData.eventTicket,
      };
      api.put('/users/buyTicket/', data).then((response) => {
        if (response.status === 200) {
          setOpenOkAlert(true);
          handleCloseConfirmDialog();
          setShowComponent(false);
          api.get(
            `/users/find/${user.cpfCnpj}`,
          ).then((res) => {
            setUser(res.data.user);
          }).catch((error) => {
            console.log(error.response);
          });
        }
      });
    } else {
      const data = {
        presentationId: presentationData._id,
        eventId: eventData._id,
        userEmail: user.email,
        numEventTickets: ticketData.eventTicket,
        numPresTickets: ticketData.presentationTicket,
      };
      api.put('/users/buyTicket/', data).then((response) => {
        if (response.status === 200) {
          setOpenOkAlert(true);
          handleCloseConfirmDialog();
          api.get(
            `/users/find/${user.cpfCnpj}`,
          ).then((res) => {
            setUser(res.data.user);
          }).catch((error) => {
            console.log(error.response);
          });
        }
      }).catch((err) => {
        console.log(err);
      });
    }
  };

  const DialogInfo: React.FC<{ category: string }> = ({ category }) => {
    return (
      <Box className='info'>
        <Typography variant='h5' color='secondary' sx={{ fontWeight: 'bold' }}>
          Dados do {category}
        </Typography>
        <Typography sx={{ mt: 2, mb: 2 }}>
          <span style={{ color: '#DEC0F7' }}>
            Título
          </span> - {category === 'evento'
            ? eventData.title
            : presentationData.title}
        </Typography>
        <Typography sx={{ mt: 2, mb: 2 }}>
          <span style={{ color: '#DEC0F7' }}>
            Número de ingressos
          </span> - {category === 'evento'
            ? ticketData.eventTicket
            : ticketData.presentationTicket}
        </Typography>
        <Typography sx={{ mt: 2, mb: 2 }}>
          <span style={{ color: '#DEC0F7' }}>
            Preço unitário
          </span> - R$ {category === 'evento'
            ? eventData.value?.toFixed(2)
            : presentationData.value?.toFixed(2)}
        </Typography>
      </Box>
    );
  };

  const ConfirmDialogBuyTicket: React.FC = () => {
    const totalPrice = (presentationData.value! * (ticketData.presentationTicket! - registeredTickets.presentationTicket))
      + (eventData.value! * (ticketData.eventTicket! - registeredTickets.eventTicket));
    return (
      <Dialog
        sx={{ '& .MuiDialog-paper': { maxHeight: 435 } }}
        open={openConfirmDialog}
        onClose={handleCloseConfirmDialog}
      >
        <DialogTitle>Finalizar Compra</DialogTitle>
        <DialogContent dividers>
          <Box className='buyTicketsDialogInfo'>
            <ScrollContainer className='buyTicketsDialogInfo'>
              <DialogInfo category='evento' />
            </ScrollContainer>
            {presentationData._id === '' || ticketData.presentationTicket === 0
              ? null
              : <ScrollContainer className='buyTicketsDialogInfo'>
                <DialogInfo category='apresentação' />
              </ScrollContainer>
            }
          </Box>
          <Typography variant='h6' sx={{ mt: 2, mb: 2, fontWeight: 'bold' }}>
            Preço total
            - <span style={{ color: '#4caf50' }}> R$ {totalPrice.toFixed(2)}</span>
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button color='secondary' autoFocus onClick={handleCloseConfirmDialog}>
            Cancelar
          </Button>
          <Button
            color='secondary'
            onClick={() => buyTicket()}
          >Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  React.useEffect(() => {
    const filteredEventUserData = user.userRegisteredEvents.find((obj) => {
      return obj.eventId === eventData._id;
    });
    const filteredPresUserData = filteredEventUserData?.userRegisteredPresentationsId
      .find((obj) => {
        return obj.presentationId === presentationData._id;
      });

    // console.log(filteredEventUserData);
    // console.log(filteredPresUserData);

    if (filteredEventUserData) {
      setTicketData({
        ...ticketData,
        eventTicket: filteredEventUserData.numEventTickets,
      });

      setRegisteredTickets({
        ...registeredTickets,
        eventTicket: filteredEventUserData.numEventTickets,
      });

      if (filteredPresUserData) {
        setTicketData({
          ...ticketData,
          eventTicket: filteredEventUserData.numEventTickets,
          presentationTicket: filteredPresUserData.numPresTickets,
        });
        setRegisteredTickets({
          ...registeredTickets,
          eventTicket: filteredEventUserData.numEventTickets,
          presentationTicket: filteredPresUserData.numPresTickets,
        });
      }
    }
  }, []);
  // console.log(ticketData.eventTicket);

  const RightTicketInputs = (category: string) => {
    let newTicket: number = 0;
    let disableButton = true;
    category === 'evento'
      ? (newTicket = ticketData.eventTicket,
      newTicket > registeredTickets.eventTicket
        ? disableButton = false
        : disableButton = true
      )
      : (newTicket = ticketData.presentationTicket,
      newTicket > registeredTickets.presentationTicket
        ? disableButton = false
        : disableButton = true);
    return (
      <Box className='buyTicketInputs'>
        <Grid item md={5}>
          <Typography color='primary' sx={{ mt: 2, mb: 2 }}>
            Selecione o número de ingressos - ({category})
          </Typography>
        </Grid>
        <Grid item md={2}>
          <Box className='rightGridInputs'>
            <TextField
              id="ticketInput"
              variant="outlined"
              type="number"
              inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', readOnly: true }}
              value={newTicket}
            />
            <Box className='ticketButtonsWrapper'>
              <Button
                onClick={() => {
                  category === 'evento' ? setTicketData({
                    ...ticketData,
                    eventTicket: ticketData.eventTicket - 1,
                  }) : setTicketData({
                    ...ticketData,
                    presentationTicket: ticketData.presentationTicket - 1,
                  });
                }}
                color='error'
                variant='contained'
                disabled={disableButton}>-1</Button>
              <Button
                onClick={() => {
                  category === 'evento' ? setTicketData({
                    ...ticketData,
                    eventTicket: ticketData.eventTicket + 1,
                  }) : setTicketData({
                    ...ticketData,
                    presentationTicket: ticketData.presentationTicket + 1,
                  });
                }}
                color='terceary'
                variant='contained'
              >+1</Button>
            </Box>
          </Box>
        </Grid>
      </Box>
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <Typography color='secondary' sx={{ mt: 2, mb: 2 }}>
        {presentationData._id === ''
          ? <span>Apenas evento selecionado</span>
          : <span>Apresentação selecionada - {presentationData.title}</span>
        }
      </Typography>
      <Box className='rightGridContent'>
        <Grid container rowGap={2} columns={{ sm: 8, md: 8 }}>
          <Grid item md={8}>
          </Grid>
          {RightTicketInputs('evento')}
          {presentationData._id === ''
            ? null
            : (RightTicketInputs('apresentação'))
          }
        </Grid>
      </Box>
      <Box sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '15px',
        padding: '5px 0px',
      }}>
        <Button onClick={() => changeRightGrid()} color='secondary'>Voltar</Button>
        {(ticketData.eventTicket === 0)
          ? <Tooltip arrow title="Mínimo de um ingresso de evento necessário.">
            <span>
              <Button
                onClick={handleOpenConfirmDialog}
                disabled={true}
                color='secondary'>Finalizar Compra</Button>
            </span>
          </Tooltip>
          : <Button
            onClick={handleOpenConfirmDialog}
            disabled={false}
            color='secondary'>Finalizar Compra</Button>
        }
        <ConfirmDialogBuyTicket />
      </Box>
    </ThemeProvider>
  );
};

export default BoxBuyTicket;
