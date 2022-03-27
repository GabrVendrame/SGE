import React from "react";
import HeaderLoginRegister from "./HeaderLoginRegister";
import BoxInputPadrao from "./BoxInputPadrao";
import { Button } from "@mui/material";
import "../styles/BoxLoginStyles.css";
import { ThemeProvider } from "@mui/material";
import ButtonStyles from "../styles/ButtonStyles";
export interface Props {
  handlesubmit: (e: React.ChangeEvent<any>) => void;
  handlechange: (e: React.ChangeEvent<any>) => void;
}

export const BoxLogin: React.FC<Props> = ({ handlesubmit, handlechange }) => {
  const theme = ButtonStyles;
  return (
    <ThemeProvider theme={theme}>
      <div className="boxlogin">
        <HeaderLoginRegister
          title={"Bem vindo de volta"}
          subtitle={"Realize seu login"}
          local={"login"}
        />
        <form name={"loginForm"} onSubmit={(e) => handlesubmit(e)}>
          <BoxInputPadrao
            name={"userLogin"}
            onchange={handlechange}
            tipo={"text"}
            placeHolder={"Usuario"}
          />
          <BoxInputPadrao
            name={"senhaLogin"}
            onchange={handlechange}
            tipo={"password"}
            placeHolder={"Senha"}
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
