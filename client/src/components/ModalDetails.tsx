import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {
  Divider, ThemeProvider,
} from '@mui/material';
import MuiStyles from '../styles/MuiStyles';
import '../styles/ModalDetailsStyles.css';
import { PresentationData } from './PresentationsBox';
import GridsModalDetails from './GridsModalDetails';
import { User } from '../pages/HomePageUser';
import { EventData } from './Itens';

interface Props {
  openModalDetails: boolean;
  setOpenModalDetails: React.Dispatch<React.SetStateAction<boolean>>;
  eventData: EventData;
  Presentations: PresentationData[];
  user: User;
}

const ModalDetails: React.FC<Props> = ({
  openModalDetails,
  setOpenModalDetails,
  eventData,
  Presentations,
  user,
}) => {
  const theme = MuiStyles;
  // const [Presentations, setPresentations] = React.useState<PresentationData[]>([]);
  const [selectedPresentation, setSelectedPresentation] = React.useState(false);
  const handleClose = () => {
    setOpenModalDetails(false);
    setSelectedPresentation(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box>
        <Modal
          open={openModalDetails}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description">
          <Box className='modalBody'>
            <Typography id="modal-modal-title" className='title' color="secondary" variant="h6" component="h2">
              {eventData.title}
            </Typography>
            <Divider color="#DEC0F7" />
            <Typography id="modal-modal-description" color='rgba(255, 255, 255, 0.7)' sx={{ mt: 2, mb: 2 }}>
              {eventData.description}
            </Typography>
            <Divider color="#DEC0F7" />
            <GridsModalDetails
              Presentations={Presentations}
              eventData={eventData}
              selectedPresentation={selectedPresentation}
              setSelectedPresentation={setSelectedPresentation}
              user={user} />
          </Box>
        </Modal>
      </Box >
    </ThemeProvider >
  );
};

export default (ModalDetails);
