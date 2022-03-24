import { Button } from "@mui/material";
import React from "react";
import BoxInputPadrao from "./BoxInputPadrao";
import HeaderLoginRegister from "./HeaderLoginRegister";
import "../styles/BoxLoginStyles.css";

export interface Props {
  handleclick: () => void;
  handlechange: (e: React.ChangeEvent<any>) => void;
}

export const BoxRegisterPrimeiraEtapa: React.FC<Props> = ({
  handleclick,
  handlechange,
}) => {
  return (
    <div className="boxlogin">
      <HeaderLoginRegister
        title={"Crie uma de graça"}
        subtitle={"Não possui uma conta?"}
        local={"register"}
      />
      <BoxInputPadrao
        name={"nome"}
        onchange={handlechange}
        tipo={"text"}
        placeHolder={"Nome Completo"}
      />
      <BoxInputPadrao
        name={"email"}
        onchange={handlechange}
        tipo={"email"}
        placeHolder={"Email"}
      />
      <BoxInputPadrao
        name={"password"}
        onchange={handlechange}
        tipo={"password"}
        placeHolder={"Senha"}
      />
      <BoxInputPadrao
        name={"confirmPassword"}
        onchange={handlechange}
        tipo={"password"}
        placeHolder={"Confirmar Senha"}
      />
      <Button
        onClick={() => handleclick()}
        type="submit"
        sx={{
          borderRadius: "30px",
          background: "#6750A4",
          width: "100%",
          paddingBottom: "10px",
          height: "43px",
        }}
        variant="contained"
      >
        Continuar
      </Button>
    </div>
  );
};

export default BoxRegisterPrimeiraEtapa;
