import { Box, Button } from '@mui/material';
import * as React from 'react';

interface Props {
  // boxBuyTicketDisplay: string;
  // setBoxBuyTicketDisplay: React.Dispatch<React.SetStateAction<string>>;
  // rightContainerGridRef: React.MutableRefObject<any>;
  setShowComponent: React.Dispatch<React.SetStateAction<boolean>>
}

const BoxBuyTicket: React.FC<Props> = ({
  // boxBuyTicketDisplay,
  // setBoxBuyTicketDisplay,
  // rightContainerGridRef,
  setShowComponent,
}) => {
  const displayBoxBuyTickectRef = React.useRef<any>(null);
  // console.log(`display: ${boxBuyTicketDisplay}`);

  const changeRightGrid = () => {
    // setBoxBuyTicketDisplay('none');
    // rightContainerGridRef.current.style.display = 'flex';
    setShowComponent(false);
  };

  return (
    <Box ref={displayBoxBuyTickectRef}
      sx={{
        // display: boxBuyTicketDisplay,
      }}>
      teste
      <Button onClick={() => changeRightGrid()}>voltar</Button>

    </Box>
  );
};

export default BoxBuyTicket;
