import { Button } from "@mui/material";
import React from "react";
import BoxInputPadrao from "./BoxInputPadrao";
import HeaderLoginRegister from "./HeaderLoginRegister";
import "../styles/BoxLoginStyles.css";
import ButtonStyles from "../styles/ButtonStyles";
import { ThemeProvider } from "@material-ui/styles";

export interface Props {
  handleclick: () => void;
  handlechange: (e: React.ChangeEvent<any>) => void;
  handlesubmit: (e: React.ChangeEvent<any>) => void;
}

export const BoxRegisterSegundaEtapa: React.FC<Props> = ({
  handleclick,
  handlechange,
  handlesubmit,
}) => {
  const theme = ButtonStyles;
  return (
    <ThemeProvider theme={theme}>
      <div className="boxlogin">
        <form name={"registerForm"} onSubmit={(e) => handlesubmit(e)}>
          <HeaderLoginRegister
            title={"Crie uma de graça"}
            subtitle={"Não possui uma conta?"}
            local={"register"}
          />

          <BoxInputPadrao
            name={"cpf"}
            onchange={handlechange}
            tipo={"text"}
            placeHolder={"Cpf"}
          />
          <BoxInputPadrao
            name={"cnpj"}
            onchange={handlechange}
            tipo={""}
            placeHolder={"Cnpj"}
          />
          <BoxInputPadrao
            name={"cell"}
            onchange={handlechange}
            tipo={"cell"}
            placeHolder={"Celular"}
          />
          <BoxInputPadrao
            name={"select"}
            onchange={handlechange}
            tipo={""}
            placeHolder={"Select"}
          />
          <Button
            type="submit"
            sx={{
              borderRadius: "30px",
              background: "#6750A4",
              width: "100%",
              paddingBottom: "10px",
              height: "43px",
              marginBottom: "10px",
            }}
            variant="contained"
          >
            Cadastrar
          </Button>
          <Button
            onClick={() => handleclick()}
            sx={{
              borderRadius: "30px",
              background: "#6750A4",
              width: "100%",
              paddingBottom: "10px",
              height: "43px",
              marginBottom: "10px",
            }}
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
