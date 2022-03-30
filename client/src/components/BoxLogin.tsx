import React, { useState } from "react";
import Axios from "axios";
import HeaderLoginRegister from "./HeaderLoginRegister";
import BoxInputPadrao from "./BoxInputPadrao";
import { Button, ThemeProvider } from "@mui/material";
import "../styles/BoxLoginStyles.css";
import * as yup from "yup";
import { useFormik } from "formik";

import ButtonStyles from "../styles/MuiStyles";

export interface Props {}

export const BoxLogin: React.FC = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    cpfCnpj: "",
    cell: "",
    userType: "",
  });

  const validationSchema = yup.object({
    email: yup.string().required("Campo obrigatorio"),
    password: yup.string().required("Campo obrigatorio"),
  });

  const reqLogion = (data: any) => {
    console.log("asdasdasda", data);
    Axios.post("http://localhost:3001/LoginAndRegister/log", data)
      .then((res: any) => {
        if (!res) alert("penis");
        else if (res.data.user) {
          alert(
            `Usuario ${res.data.res.name} do tipo ${res.data.res.userType} logado`
          );
          console.log(res.data);
          localStorage.setItem("token", JSON.stringify(res.data.tk));
          //console.log(res.data.tk);
          window.location.reload();
        } else {
          alert("Usuario nao encontrado");
        }
      })
      .catch((error: any) => {
        console.log(error);
      });

    // Axios.get("http://localhost:3001/LoginAndRegister", { data })
    //   .then((res: any) => {
    //     console.log("asdasdasda", res.data);
    //     if (!res) alert("penis");
    //     else {
    //       if (res.data.user) {
    //         alert(
    //           `Usuario ${res.data.res.name} do tipo ${res.data.res.userType} logado`
    //         );
    //         window.location.reload();
    //       } else {
    //         alert("Usuario nao encontrado");
    //       }
    //     }
    //   })
    //   .catch((error: any) => {
    //     console.log(error);
    //   });
  };
  const formik = useFormik({
    initialValues: data,
    onSubmit: (values) => {
      // console.log("Fazer requisicao do login aqui", values);
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
            title={"Bem vindo de volta"}
            subtitle={"Realize seu login"}
            local={"login"}
          />

          <BoxInputPadrao
            name={"email"}
            value={formik.values.email}
            onChange={formik.handleChange}
            tipo={"text"}
            placeHolder={"Usuario"}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <BoxInputPadrao
            name={"password"}
            tipo={"password"}
            placeHolder={"Senha"}
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <Button
            type="submit"
            sx={{
              borderRadius: "30px",
              // background: "#6750A4",
              width: "100%",
              paddingBottom: "10px",
              height: "43px",
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
