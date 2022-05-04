import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Portal,
  Snackbar,
  ThemeProvider,
} from '@mui/material';
import { Link } from 'react-router-dom';
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
  setUser: React.Dispatch<React.SetStateAction<User>>;

}

const ModalDetails: React.FC<Props> = ({
  openModalDetails,
  setOpenModalDetails,
  eventData,
  Presentations,
  user,
  setUser,
}) => {
  const theme = MuiStyles;
  const [selectedPresentation, setSelectedPresentation] = React.useState(false);
  const [openOkAlert, setOpenOkAlert] = React.useState(false);
  const [openAlert, setOpenAlert] = React.useState<boolean>(false);
  const [openConfirmDialog, setOpenConfirmDialog] = React.useState(false);
  const [isPresRegistered, setIsPresRegistered] = React.useState(false);

  const handleCloseConfirmDialog = () => {
    setOpenConfirmDialog(false);
  };

  const handleClose = () => {
    setOpenModalDetails(false);
    setSelectedPresentation(false);
    setOpenAlert(false);
    setIsPresRegistered(false);
  };

  const handleCloseOkAlert = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenOkAlert(false);
  };

  const handleCloseAlert = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenAlert(false);
    setIsPresRegistered(false);
  };

  const ConfirmDialogLoginRequest: React.FC = () => {
    return (
      <Dialog
        sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
        maxWidth="xs"
        open={openConfirmDialog}
        onClose={handleCloseConfirmDialog}
      >
        <DialogTitle>Comprar ingresso</DialogTitle>
        <DialogContent dividers>
          <DialogContentText>
            É necessário estar logado em uma conta como usuário comum para
            realizar a compra de um ingresso.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color='secondary' autoFocus onClick={handleCloseConfirmDialog}>
            Cancelar
          </Button>
          <Link to={'/LoginAndRegister'} style={{ textDecoration: 'none' }}>
            <Button
              color='secondary'
            >Realizar Login
            </Button>
          </Link>
        </DialogActions>
      </Dialog>
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <Box>
        <Portal>
          <Snackbar open={openOkAlert} autoHideDuration={6000} onClose={handleCloseOkAlert}>
            <Alert onClose={handleCloseOkAlert} severity="success" sx={{ width: '100%' }}>
              Compra realizada com sucesso!
            </Alert>
          </Snackbar>
          <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleCloseAlert}>
            <Alert onClose={handleCloseAlert} severity="info" sx={{ width: '100%' }}>
              {isPresRegistered
                ? <span>Você já está registrado nesse evento e nessa apresentação.</span>
                : <span>Você já está registrado nesse evento.</span>}
            </Alert>
          </Snackbar>
        </Portal>
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
              user={user}
              setUser={setUser}
              setOpenOkAlert={setOpenOkAlert}
              setOpenAlert={setOpenAlert}
              setOpenConfirmDialog={setOpenConfirmDialog}
              setIsPresRegistered={setIsPresRegistered}
            />
            <ConfirmDialogLoginRequest />
          </Box>
        </Modal>
      </Box >
    </ThemeProvider >
  );
};

export default (ModalDetails);
