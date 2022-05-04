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
import { User } from '../pages/HomePageUser';
import BoxInputPadrao from './BoxInputPadrao';

interface Props {
  openModalDetails: boolean;
  setOpenModalDetails: React.Dispatch<React.SetStateAction<boolean>>;
  user: User;
}

const ProfileModalDetails: React.FC<Props> = ({
  openModalDetails,
  setOpenModalDetails,
  user,
}) => {
  const theme = MuiStyles;
  const [selectedPresentation, setSelectedPresentation] = React.useState(false);
  const handleClose = () => {
    setOpenModalDetails(false);
    setSelectedPresentation(false);
  };

  const validationSchema = yup.object({
    name: yup.string(),
    email: yup.string().email('Email invalido'),
    password: yup.string().min(8, 'Senha muito curta'),
    cell: yup.string(),
  });

  const validarReq = (values: User) => {
    if (
      values.name === ''
      && values.password === ''
      && values.cell === ''
      && values.email === ''
    ) {
      return false;
    }
    return true;
  };

  const formik = useFormik({
    initialValues: user,
    onSubmit: (values) => {
      if (validarReq(values)) {
        values.cpfCnpj = user.cpfCnpj;
        console.log('Fazer requisicao do login aqui', values);
        Axios.put('http://localhost:3001/api/users/update', values)
          .then((res) => {
            console.log('fon');
            alert('Dados alterados');
            window.location.reload();
          })
          .catch((error) => {
            console.log(error);
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
              {'Alterar informações de perfil'}
            </Typography>
            <Divider color="#DEC0F7" />
            <div className="box">
              <form onSubmit={formik.handleSubmit}>
                <div className="row">
                  <BoxInputPadrao
                    name={'name'}
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    tipo={'text'}
                    placeHolder={user.name}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                  />
                  <BoxInputPadrao
                    name={'password'}
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    tipo={'password'}
                    placeHolder={'Senha'}
                    error={
                      formik.touched.password && Boolean(formik.errors.password)
                    }
                    helperText={
                      formik.touched.password && formik.errors.password
                    }
                  />
                </div>
                <div className="row">
                  <BoxInputPadrao
                    name={'cell'}
                    value={formik.values.cell}
                    onChange={formik.handleChange}
                    tipo={'text'}
                    placeHolder={user.cell}
                    error={formik.touched.cell && Boolean(formik.errors.cell)}
                    helperText={formik.touched.cell && formik.errors.cell}
                  />
                </div>
                <div className="row">
                  <BoxInputPadrao
                    name={'email'}
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    tipo={'email'}
                    placeHolder={user.email}
                    error={() => console.log('fon')}
                    helperText={() => console.log('fon')}
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
            </div>
          </Box>
        </Modal>
      </Box>
    </ThemeProvider>
  );
};

export default ProfileModalDetails;
