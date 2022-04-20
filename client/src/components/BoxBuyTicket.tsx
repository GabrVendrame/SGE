import { Box, Button } from '@mui/material';
import * as React from 'react';

interface Props {
  boxBuyTicketDisplay: string;
  setBoxBuyTicketDisplay: React.Dispatch<React.SetStateAction<string>>;
  rightContainerGridRef: React.MutableRefObject<any>;
}

const BoxBuyTicket: React.FC<Props> = ({
  boxBuyTicketDisplay,
  setBoxBuyTicketDisplay,
  rightContainerGridRef,
}) => {
  const displayBoxBuyTickectRef = React.useRef<any>(null);
  console.log(`display: ${boxBuyTicketDisplay}`);

  const changeRightGrid = () => {
    setBoxBuyTicketDisplay('none');
    rightContainerGridRef.current.style.display = 'flex';
  };

  return (
    <Box ref={displayBoxBuyTickectRef}
      sx={{
        display: boxBuyTicketDisplay,
      }}>
      teste
      <Button onClick={() => changeRightGrid()}>voltar</Button>

    </Box>
  );
};

export default BoxBuyTicket;
