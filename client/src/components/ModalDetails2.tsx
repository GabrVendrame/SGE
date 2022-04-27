import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Button, Divider, ThemeProvider } from "@mui/material";
import MuiStyles from "../styles/MuiStyles";
import "../styles/ModalDetailsStyles.css";
import { PresentationData } from "./PresentationsBox";
import GridsModalDetails from "./GridsModalDetails";
import { EventData } from "./Itens";
import BoxInputPadrao from "./BoxInputPadrao";
import * as yup from "yup";
import { useFormik } from "formik";
import HeaderLoginRegister from "./HeaderLoginRegister";
interface Props {
  openModalDetails: boolean;
  setOpenModalDetails: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalDetails: React.FC<Props> = ({
  openModalDetails,
  setOpenModalDetails,
}) => {
  const theme = MuiStyles;
  // const [Presentations, setPresentations] = React.useState<PresentationData[]>([]);
  const [selectedPresentation, setSelectedPresentation] = React.useState(false);
  const handleClose = () => {
    setOpenModalDetails(false);
    setSelectedPresentation(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box>
        <Modal
          open={openModalDetails}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className="modalBody">
            <Typography
              id="modal-modal-title"
              className="title"
              color="secondary"
              variant="h6"
              component="h2"
            >
              {"Alterar informações de perfil"}
            </Typography>
            <Divider color="#DEC0F7" />
            <div className="boxlogin">
              <form onSubmit={() => console.log("fon")}>
                <BoxInputPadrao
                  name={"email"}
                  value={"formik.values.email"}
                  onChange={() => console.log("fon")}
                  tipo={"text"}
                  placeHolder={"Nome completo"}
                  error={() => console.log("fon")}
                  helperText={() => console.log("fon")}
                />
                <BoxInputPadrao
                  name={"email"}
                  value={"formik.values.email"}
                  onChange={() => console.log("fon")}
                  tipo={"text"}
                  placeHolder={"Senha"}
                  error={() => console.log("fon")}
                  helperText={() => console.log("fon")}
                />
                <BoxInputPadrao
                  name={"email"}
                  value={"formik.values.email"}
                  onChange={() => console.log("fon")}
                  tipo={"text"}
                  placeHolder={"Comfirme sua senha"}
                  error={() => console.log("fon")}
                  helperText={() => console.log("fon")}
                />
                <BoxInputPadrao
                  name={"email"}
                  value={"formik.values.email"}
                  onChange={() => console.log("fon")}
                  tipo={"text"}
                  placeHolder={"Celular"}
                  error={() => console.log("fon")}
                  helperText={() => console.log("fon")}
                />
                <BoxInputPadrao
                  name={"email"}
                  value={"formik.values.email"}
                  onChange={() => console.log("fon")}
                  tipo={"text"}
                  placeHolder={"email"}
                  error={() => console.log("fon")}
                  helperText={() => console.log("fon")}
                />
              </form>
            </div>
            <Button
              size="small"
              variant="contained"
              color="secondary"
              onClick={() => handleClose()}
            >
              Voltar
            </Button>
          </Box>
        </Modal>
      </Box>
    </ThemeProvider>
  );
};

export default ModalDetails;
