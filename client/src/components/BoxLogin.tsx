import React, { useState } from 'react';
import Axios from 'axios';
import { Button, ThemeProvider } from '@mui/material';
import '../styles/BoxLoginStyles.css';
import * as yup from 'yup';
import { useFormik } from 'formik';
import HeaderLoginRegister from './HeaderLoginRegister';
import BoxInputPadrao from './BoxInputPadrao';
import ButtonStyles from '../styles/MuiStyles';

export interface Props { }

export const BoxLogin: React.FC = () => {
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    cpfCnpj: '',
    cell: '',
    userType: '',
  });

  const validationSchema = yup.object({
    email: yup.string().required('Campo obrigatorio'),
    password: yup.string().required('Campo obrigatorio'),
  });

  const reqLogion = (data: any) => {
    Axios.post('http://localhost:3001/api/users/login', data)
      .then((res: any) => {
        localStorage.setItem('token', res.data.tk.id.cpfCnpj);
        window.location.reload();
      })
      .catch((error: any) => {
        alert('Falha no login');
        console.log(error);
      });
  };
  const formik = useFormik({
    initialValues: data,
    onSubmit: (values) => {
      reqLogion(values);
    },

    validationSchema,
  });
  const theme = ButtonStyles;
  return (
    <ThemeProvider theme={theme}>
      <div className="boxlogin">
        <form onSubmit={formik.handleSubmit}>
          <HeaderLoginRegister
            title={'Bem vindo de volta'}
            subtitle={'Realize seu login'}
            local={'login'}
          />
          <BoxInputPadrao
            name={'email'}
            value={formik.values.email}
            onChange={formik.handleChange}
            tipo={'text'}
            placeHolder={'Usuario'}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <BoxInputPadrao
            name={'password'}
            tipo={'password'}
            placeHolder={'Senha'}
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
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
            Login
          </Button>
        </form>
      </div>
    </ThemeProvider>
  );
};

export default BoxLogin;
