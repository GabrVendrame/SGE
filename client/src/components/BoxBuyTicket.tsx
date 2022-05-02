import {
  Box, Button, Grid, ThemeProvider, Typography,
} from '@mui/material';
import * as React from 'react';
import '../styles/BoxBuyTicket.css';
import TextField from '@mui/material/TextField';
import MuiStyles from '../styles/MuiStyles';
import { PresentationData } from './PresentationsBox';
import { EventData } from './Itens';
import api from '../services/api';
import { User } from '../pages/HomePageUser';

interface Props {
  // boxBuyTicketDisplay: string;
  // setBoxBuyTicketDisplay: React.Dispatch<React.SetStateAction<string>>;
  // rightContainerGridRef: React.MutableRefObject<any>;
  setShowComponent: React.Dispatch<React.SetStateAction<boolean>>
  presentationData: PresentationData;
  eventData: EventData;
  user: User;
}
interface TicketsData {
  eventTicket: number,
  presentationTicket: number,
}

const BoxBuyTicket: React.FC<Props> = ({
  // boxBuyTicketDisplay,
  // setBoxBuyTicketDisplay,
  // rightContainerGridRef,
  setShowComponent,
  presentationData,
  eventData,
  user,
}) => {
  // const displayBoxBuyTickectRef = React.useRef<any>(null);
  const [ticketData, setTicketData] = React.useState<TicketsData>({
    eventTicket: 0,
    presentationTicket: 0,
  });
  // const [disableBuyTicket, setDisableBuyTicket] = React.useState<boolean>(true);
  const theme = MuiStyles;
  // console.log(`display: ${boxBuyTicketDisplay}`);

  const changeRightGrid = () => {
    // setBoxBuyTicketDisplay('none');
    // rightContainerGridRef.current.style.display = 'flex';
    setShowComponent(false);
  };

  const buyTicket = () => {
    // Axios.put("http://localhost:3001/api/users/update", values)
    console.log(user.email);
    const data = {
      presentationId: presentationData._id,
      eventId: eventData._id,
      userEmail: user.email,
    };
    api.put('/users/buyTicket/', data).then((response) => {
      // setPresentations(response.data);
      // console.log(response.data);
    });
  };

  const rightTicketInputs = (category: string) => {
    let ticket: number = 0;
    let disableButton = true;

    category === 'evento'
      ? (ticket = ticketData.eventTicket,
      ticket > 0
        ? disableButton = false
        : disableButton = true
      )
      : (ticket = ticketData.presentationTicket,
      ticket > 0
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
              value={ticket}
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
                variant='contained'>+1</Button>
            </Box>
          </Box>
        </Grid>
      </Box>
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <Typography color='secondary' sx={{ mt: 2, mb: 2 }}>
        Selecionado - {presentationData.title}
      </Typography>
      <Box className='rightGridContent'>
        <Grid container rowGap={2} columns={{ sm: 8, md: 8 }}>
          <Grid item md={8}>
          </Grid>
          {rightTicketInputs('evento')}
          {rightTicketInputs('apresentação')}
        </Grid>
      </Box>
      <Box sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '15px',
        padding: '5px 0px',
      }}>
        <Button onClick={() => changeRightGrid()} color='secondary'>Voltar</Button>
        {(ticketData.eventTicket === 0 || ticketData.presentationTicket === 0)
          ? <Button onClick={() => buyTicket()}
            disabled={true}
            color='secondary'>Comprar ingresso</Button>
          : <Button onClick={() => buyTicket()}
            disabled={false}
            color='secondary'>Comprar ingresso</Button>
        }
      </Box>
    </ThemeProvider>
  );
};

export default BoxBuyTicket;
