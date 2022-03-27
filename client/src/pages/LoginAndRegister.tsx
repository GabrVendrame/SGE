import React from "react";
import Axios from "axios";
import { Box } from "@mui/material";
import { useState } from "react";

import Header from "../components/HeaderPageLoginRegister";

import "../styles/LoginAndRegister.css";
import BoxLogin from "../components/BoxLogin";
import BoxRegisterPrimeiraEtapa from "../components/BoxRegisterPrimeiraEtapa";
import BoxRegisterSegundaEtapa from "../components/BoxRegisterSegundaEtapa";

function LoginAndRegister() {
  const [next, setNext] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  //const [confirmpassword, setConfirmPassword] = useState("");

  const handleClick = () => {
    setNext(!next);
  };

  const handleChange = (e: React.ChangeEvent<any>) => {
    switch (e.target.name) {
      case "nome":
        setName(e.target.value);
        break;
      case "email":
        setEmail(e.target.value);
        break;
      case "password":
        setPassword(e.target.value);
        break;
      case "confirmPassword":
        setConfirmPassword(e.target.value);
        break;

      default:
        break;
    }
  };

  const handleSubmit = (e: React.ChangeEvent<any>) => {
    e.preventDefault();
    let formdata = new FormData(e.target);
    if (next === true) {
      formdata.append("name", name);
      formdata.append("email", email);
      formdata.append("password", password);
      formdata.append("confirmpassword", confirmpassword);
    }

    const data = Object.fromEntries(formdata);
    console.log(data);
    if (!data.name || !data.email || !data.password || !data.confirmpassword) {
      alert("Existem campos a preencher");
    } else {
      console.log("aaaa");

      console.log(data);
      Axios.post("http://localhost:3001/LoginAndRegister", data)
        .then((res: any) => {
          if (!res) alert("penis");
          else alert("usuario registrado");
          // window.location.reload();
        })
        .catch((error: any) => {
          console.log(error);
        });
    }
    console.log(data.name);
    console.log(data.cell);
  };

  return (
    <Box className="body">
      <Header />
      <section className="main">
        <BoxLogin handlesubmit={handleSubmit} handlechange={handleChange} />

        {next === true ? (
          <BoxRegisterSegundaEtapa
            handleclick={handleClick}
            handlechange={handleChange}
            handlesubmit={handleSubmit}
          />
        ) : (
          <BoxRegisterPrimeiraEtapa
            handleclick={handleClick}
            handlechange={handleChange}
          />
        )}
      </section>
    </Box>
  );
}

export default LoginAndRegister;
