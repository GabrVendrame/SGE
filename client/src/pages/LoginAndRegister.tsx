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

  const reqRegister = (data: any) => {
    Axios.post("http://localhost:3001/LoginAndRegister", data)
      .then((res: any) => {
        if (!res) alert("penis");
        else alert("usuario registrado");
        window.location.reload();
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

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
      console.log("fazer o request no bd aqui", newData);
      reqRegister(newData);
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

  return (
    <Box className="body">
      <Header />
      <section className="main">
        <BoxLogin />
        {steps[currentStep]}
      </section>
    </Box>
  );
}

export default LoginAndRegister;
