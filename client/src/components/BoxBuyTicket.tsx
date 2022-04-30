import { Box, Button, Grid, ThemeProvider, Typography } from '@mui/material';
import * as React from 'react';
import "../styles/BoxBuyTicket.css";
import MuiStyles from '../styles/MuiStyles';
import { PresentationData } from './PresentationsBox';
import TextField from '@mui/material/TextField';
import Collapse from '@mui/material/Collapse';

interface Props {
  // boxBuyTicketDisplay: string;
  // setBoxBuyTicketDisplay: React.Dispatch<React.SetStateAction<string>>;
  // rightContainerGridRef: React.MutableRefObject<any>;
  setShowComponent: React.Dispatch<React.SetStateAction<boolean>>
  presentationData: PresentationData;
}

const BoxBuyTicket: React.FC<Props> = ({
  // boxBuyTicketDisplay,
  // setBoxBuyTicketDisplay,
  // rightContainerGridRef,
  setShowComponent,
  presentationData,
}) => {
  // const displayBoxBuyTickectRef = React.useRef<any>(null);
  const [eventTicket, setEventTicket] = React.useState<number>(0);
  const [presentationTicket, setPresentationTicket] = React.useState<number>(0);
  const [disableEventButton, setDisableEventButton] = React.useState<boolean>(true);
  const [disablePresentationButton, setDisablePresentationButton] = React.useState<boolean>(true);
  const theme = MuiStyles;
  // console.log(`display: ${boxBuyTicketDisplay}`);

  const changeRightGrid = () => {
    // setBoxBuyTicketDisplay('none');
    // rightContainerGridRef.current.style.display = 'flex';
    setShowComponent(false);
  };

  const changeInputValue = (newValue: number, isEventTicket: boolean) => {
    let value = 0;

    isEventTicket
      ? (value = eventTicket + newValue,
        setEventTicket(value),
        value == 0
          ? setDisableEventButton(true)
          : setDisableEventButton(false))
      : (value = presentationTicket + newValue,
        setPresentationTicket(value),
        value == 0
          ? setDisablePresentationButton(true)
          : setDisablePresentationButton(false));
  }
  return (
    <ThemeProvider theme={theme}>
        <Typography color='secondary' sx={{ mt: 2, mb: 2 }}>
          Selecionado - {presentationData.title}
        </Typography>
        <Box className='rightGridContent'>
          <Grid container rowGap={2} columns={{ sm: 8, md: 8 }}>
            <Grid item md={8}>
            </Grid>
            <Box className='buyTicketInputs'>
              <Grid item md={5}>
                <Typography color='primary' sx={{ mt: 2, mb: 2 }}>
                  Selecione o número de ingressos (evento)
                </Typography>
              </Grid>
              <Grid item md={2}>
                <Box className='rightGridInputs'>
                  <TextField
                    id="eventTicketInput"
                    variant="outlined"
                    type="number"
                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', readOnly: true }}
                    value={eventTicket}
                  />
                  <Box className='ticketButtonsWrapper'>
                    <Button
                      onClick={() => changeInputValue(-1, true)}
                      color='minusOneItem'
                      variant='contained'
                      disabled={disableEventButton}>-1</Button>
                    <Button onClick={(value) => changeInputValue(1, true)} color='plusOneItem' variant='contained'>+1</Button>
                  </Box>
                </Box>
              </Grid>
            </Box>
            <Box className='buyTicketInputs'>
              <Grid item md={5}>
                <Typography color='primary' sx={{ mt: 2, mb: 2 }}>
                  Selecione o número de ingressos (apresentação)
                </Typography>
              </Grid>
              <Grid item md={2}>
                <Box className='rightGridInputs'>
                  <TextField
                    id="presentationTicketInput"
                    variant="outlined"
                    type="number"
                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', readOnly: true }}
                    value={presentationTicket}
                  />
                  <Box className='ticketButtonsWrapper'>
                    <Button
                      onClick={() => changeInputValue(-1, false)}
                      color='minusOneItem'
                      variant='contained'
                      disabled={disablePresentationButton}
                    >-1</Button>
                    <Button onClick={() => changeInputValue(1, false)} color='plusOneItem' variant='contained'>+1</Button>
                  </Box>
                </Box>
              </Grid>
            </Box>
          </Grid>
        </Box>
        <Box sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '15px',
          padding: '5px 0px'
        }}>
          <Button onClick={() => changeRightGrid()} color='secondary'>Voltar</Button>
          <Button onClick={() => console.log('Comprar ingresso')} color='secondary'>Comprar ingresso</Button>
        </Box>
    </ThemeProvider>

  );
};

export default BoxBuyTicket;
