import { Button, InputLabel, MenuItem } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import React, { useState } from "react";
import BoxInputPadrao from "./BoxInputPadrao";
import HeaderLoginRegister from "./HeaderLoginRegister";
import "../styles/BoxLoginStyles.css";
import ButtonStyles from "../styles/ButtonStyles";
import { ThemeProvider } from "@material-ui/styles";
import BoxInputSelect from "./BoxInputSelect";

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
  const [userType, setUserType] = useState("Usuario Comum");

  const handleChangeSeletc = (event: SelectChangeEvent) => {
    setUserType(event.target.value as string);
    console.log(event.target.value as string);
    console.log(event.target.name as string);
  };

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
            name={"cpfCnpj"}
            onchange={handlechange}
            tipo={"text"}
            placeHolder={"Cpf/Cnpj"}
          />
          {/* <BoxInputPadrao
            name={"cnpj"}
            onchange={handlechange}
            tipo={""}
            placeHolder={"Cnpj"}
          /> */}
          <BoxInputPadrao
            name={"cell"}
            onchange={handlechange}
            tipo={"cell"}
            placeHolder={"Celular"}
          />

          <Select
            name={"selectUser"}
            value={userType}
            onChange={handleChangeSeletc}
            sx={{
              textTransform: "inherit",
              textDecoration: "inherit",

              width: "100%",
              border: "1px solid",
              borderColor: "#C3BFC3",
              color: "#C3BFC3",
              paddingBottom: "10px",
              height: "50px",
              marginBottom: "10px",
            }}
          >
            <MenuItem value={"Usuario Comum"}>Usuario Comum</MenuItem>
            <MenuItem value={"Usuario Palestrante"}>
              Usuario Palestrante
            </MenuItem>
            <MenuItem value={"Usuario Criador de Evento"}>
              Usuario Criador de Evento
            </MenuItem>
          </Select>
          <Button
            type="submit"
            sx={{
              borderRadius: "30px",
              // background: "#6750A4",
              width: "100%",
              paddingBottom: "10px",
              height: "43px",
              marginBottom: "10px",
            }}
            color="secondary"
            variant="contained"
          >
            Cadastrar
          </Button>
          <Button
            onClick={() => handleclick()}
            sx={{
              borderRadius: "30px",
              // background: "#6750A4",
              width: "100%",
              paddingBottom: "10px",
              height: "43px",
              marginBottom: "10px",
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
