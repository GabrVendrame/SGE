import {
  Button, MenuItem, Select, TextField,
} from '@mui/material';
import React from 'react';
import '../styles/BoxLoginStyles.css';
import { ThemeProvider } from '@material-ui/system';
import { useFormik } from 'formik';
import * as yup from 'yup';
import ButtonStyles from '../styles/MuiStyles';
import BoxInputPadrao from './BoxInputPadrao';
import HeaderLoginRegister from './HeaderLoginRegister';

export interface Props {
  next: (
    newData: {
      name: string;
      email: string;
      password: string;
      confirmPassword: string;
      cpfCnpj: string;
      cell: string;
      userType: string;
    },
    control: boolean
  ) => void;
  prev: (newData: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    cpfCnpj: string;
    cell: string;
    userType: string;
  }) => void;
  data: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    cpfCnpj: string;
    cell: string;
    userType: string;
  };
}

export const BoxRegisterSegundaEtapa: React.FC<Props> = ({
  next,
  prev,
  data,
}) => {
  const validationSchema = yup.object({
    cpfCnpj: yup.string().required('Campo obrigatorio'),
    cell: yup.string().required('Campo obrigatorio'),
    userType: yup.string().required('Campo obrigatorio'),
  });

  const formik = useFormik({
    initialValues: data,

    onSubmit: (data) => {
      console.log('segunda etapa', data);
      next(data, true);
    },

    validationSchema,
  });

  const theme = ButtonStyles;
  return (
    <ThemeProvider theme={theme}>
      <div className="boxlogin">
        <form onSubmit={formik.handleSubmit}>
          <HeaderLoginRegister
            title={'Crie uma de graça'}
            subtitle={'Não possui uma conta?'}
            local={'register'}
          />
          <BoxInputPadrao
            tipo="text"
            placeHolder="Cpf ou Cnpj"
            name="cpfCnpj"
            value={formik.values.cpfCnpj}
            onChange={formik.handleChange}
            error={formik.touched.cpfCnpj && Boolean(formik.errors.cpfCnpj)}
            helperText={formik.touched.cpfCnpj && formik.errors.cpfCnpj}
          />
          <BoxInputPadrao
            tipo="text"
            placeHolder="Cell"
            name="cell"
            value={formik.values.cell}
            onChange={formik.handleChange}
            error={formik.touched.cell && Boolean(formik.errors.cell)}
            helperText={formik.touched.cell && formik.errors.cell}
          />
          <Select
            name="userType"
            value={formik.values.userType}
            onChange={formik.handleChange}
            error={formik.touched.userType && Boolean(formik.errors.userType)}
            sx={{
              textTransform: 'inherit',
              textDecoration: 'inherit',
              width: '100%',
              border: '1px solid',
              borderColor: '#C3BFC3',
              color: '#C3BFC3',
              paddingBottom: '10px',
              height: '50px',
              marginBottom: '10px',
            }}
          >
            <MenuItem value={'Usuario Comum'}>Usuario Comum</MenuItem>
            <MenuItem value={'Usuario Palestrante'}>
              Usuario Palestrante
            </MenuItem>
            <MenuItem value={'Usuario Criador de Evento'}>
              Usuario Criador de Evento
            </MenuItem>
          </Select>

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
            Enviar
          </Button>
          <Button
            onClick={() =>
              prev({
                name: '',
                email: '',
                password: '',
                confirmPassword: '',
                cpfCnpj: '',
                cell: '',
                userType: '',
              })
            }
            sx={{
              borderRadius: '30px',
              width: '100%',
              paddingBottom: '10px',
              height: '43px',
              marginBottom: '10px',
              marginTop: '10px',
            }}
            color="secondary"
            variant="contained"
          >
            Voltar
          </Button>
        </form>
      </div>
    </ThemeProvider>
  );
};

export default BoxRegisterSegundaEtapa;
