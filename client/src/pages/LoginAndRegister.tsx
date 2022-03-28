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
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    cpfCnpj: "",
    cell: "",
    userType: "",
  });
  const handleNextStep = (
    newData: {
      name: string;
      email: string;
      password: string;
      confirmPassword: string;
      cpfCnpj: string;
      cell: string;
      userType: string;
    },
    final = false
  ) => {
    setData((prev) => ({ ...prev, ...newData }));
    if (final) {
      //makeRequest(newData);
      console.log(newData);

      return;
    }

    setCurrentStep((prev) => prev + 1);
  };
  const handlePrevStep = (newData: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    cpfCnpj: string;
    cell: string;
    userType: string;
  }) => {
    setData((prev) => ({ ...prev, ...newData }));
    setCurrentStep((prev) => prev - 1);
  };

  const steps = [
    <BoxRegisterPrimeiraEtapa next={handleNextStep} data={data} />,

    <BoxRegisterSegundaEtapa
      next={handleNextStep}
      prev={handlePrevStep}
      data={data}
    />,
  ];

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
        {steps[currentStep]}
      </section>
    </Box>
  );
}

export default LoginAndRegister;
