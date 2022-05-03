import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Button, Divider, Grid, ThemeProvider } from "@mui/material";
import { ErrorMessage, useFormik } from "formik";
import * as yup from "yup";
import Axios from "axios";
import MuiStyles from "../styles/MuiStyles";
import "../styles/ProfileModalDetails.css";
import "../styles/styleTitle.css";
import "../styles/CreatePalestraStyles.css";
import "../styles/ModalDetailsStyles.css";
import { User } from "../pages/HomePageUser";
import BoxInputPadrao from "./BoxInputPadrao";
import EventsBox from "./EventsBox";
import { EventData } from "./Itens";

interface Props {
  openModalDetails: boolean;
  setOpenModalDetails: React.Dispatch<React.SetStateAction<boolean>>;
  user: User;
  events: EventData[];
}

export interface Event {
  title: String;
  description: String;
  img: String;
  value: Number;
  remainingVacancies: Number;
  isSingleDay: Boolean;
  dateByDay: [
    {
      initialDate: Date;
      finalDate: Date;
    }
  ];
  url: String;
}
export interface Presentation {
  title: String;
  description: String;
  img: String;
  value: Number;
  remainingVacancies: Number;
  isSingleDay: Boolean;
  dateByDay: [
    {
      initialDate: Date;
      finalDate: Date;
    }
  ];
  eventId: String;
}

const CreateEventsModalDetails: React.FC<Props> = ({
  openModalDetails,
  setOpenModalDetails,
  user,
  events,
}) => {
  const theme = MuiStyles;
  // const [Presentations, setPresentations] = React.useState<PresentationData[]>([]);
  const [selectedPresentation, setSelectedPresentation] = React.useState(false);
  const [selectedEvent, setSelectedEvent] = React.useState<EventData>({
    _id: "",
    title: "",
    description: "",
    img: "",
    value: 0.0,
    remainingVacancies: 0,
    isSingleDay: true,
    dateByDay: [
      {
        initialDate: new Date(),
        finalDate: new Date(),
        _id: "",
      },
    ],
    url: "",
  });

  const [event, setEvent] = React.useState<Event>({
    title: "",
    description: "",
    img: "",
    value: 0,
    remainingVacancies: 0,
    isSingleDay: false,
    dateByDay: [
      {
        initialDate: new Date(),
        finalDate: new Date(),
      },
    ],
    url: "",
  });

  const [presentation, setPresentation] = React.useState<Presentation>({
    title: "",
    description: "",
    img: "",
    value: 0,
    remainingVacancies: 0,
    isSingleDay: false,
    dateByDay: [
      {
        initialDate: new Date(),
        finalDate: new Date(),
      },
    ],
    eventId: "",
  });

  const handleClose = () => {
    setOpenModalDetails(false);
    setSelectedPresentation(false);
  };

  const validationSchema = yup.object({
    title: yup.string().required().required("Campo Obrigatorio"),
    description: yup.string().required("Campo Obrigatorio"),
    remainingVacancies: yup
      .number()
      .required("Campo Obrigatorio")
      .positive("numero invalido"),
    value: yup
      .number()
      .required("Campo Obrigatorio")
      .positive("numero invalido"),
    url: yup.string().required("Campo Obrigatorio"),
  });

  const formik = useFormik({
    initialValues: presentation,
    onSubmit: (values) => {
      console.log("requisicao de criar um evento aqui");
      console.log(values);
      // Axios.post("http://localhost:3001/api/events/CreateEvent", values)
      //   .then((res: any) => {
      //     console.log(res);
      //     alert("EventoCriado");
      //     window.location.reload();
      //   })
      //   .catch((error: any) => {
      //     alert("Faio");
      //     window.location.reload();
      //   });
    },

    validationSchema,
  });

  //console.log(selectedEvent);
  var event2;
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
              Criar apresentação
            </Typography>
            <Divider color="#DEC0F7" />
            <Grid container columns={{ sm: 8, md: 8 }}>
              <Grid item md={8}>
                <Box>
                  <div className="boxdiv">
                    <div className="titulo">
                      <h1>Evento selecionado:</h1>
                      <h2>{selectedEvent.title}</h2>
                    </div>
                    <form onSubmit={formik.handleSubmit}>
                      <BoxInputPadrao
                        name={"title"}
                        value={formik.values.title}
                        onChange={formik.handleChange}
                        tipo={"text"}
                        placeHolder={"FAZER O SELECT COM OS EVENTOS"}
                        error={
                          formik.touched.title && Boolean(formik.errors.title)
                        }
                        helperText={formik.touched.title && formik.errors.title}
                      />
                      <BoxInputPadrao
                        name={"title"}
                        value={formik.values.title}
                        onChange={formik.handleChange}
                        tipo={"text"}
                        placeHolder={"Nome da apresentacao"}
                        error={
                          formik.touched.title && Boolean(formik.errors.title)
                        }
                        helperText={formik.touched.title && formik.errors.title}
                      />

                      <BoxInputPadrao
                        name={"description"}
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        tipo={"text"}
                        placeHolder={"Descricao"}
                        error={
                          formik.touched.description &&
                          Boolean(formik.errors.description)
                        }
                        helperText={
                          formik.touched.description &&
                          formik.errors.description
                        }
                      />
                      <BoxInputPadrao // fazer um novo imput para int com min range em 0
                        name={"remainingVacancies"}
                        value={formik.values.remainingVacancies}
                        onChange={formik.handleChange}
                        tipo={"number"}
                        placeHolder={"Número de vagas"}
                        error={
                          formik.touched.remainingVacancies &&
                          Boolean(formik.errors.remainingVacancies)
                        }
                        helperText={
                          formik.touched.remainingVacancies &&
                          formik.errors.remainingVacancies
                        }
                      />
                      <BoxInputPadrao // fazer um novo imput para decimal com min range em 0
                        name={"value"}
                        value={formik.values.value}
                        onChange={formik.handleChange}
                        tipo={"number"}
                        placeHolder={"preco de ingresso"}
                        error={
                          formik.touched.value && Boolean(formik.errors.value)
                        }
                        helperText={formik.touched.value && formik.errors.value}
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
                        Criar palestra
                      </Button>
                    </form>
                  </div>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Modal>
      </Box>
    </ThemeProvider>
  );
};

export default CreateEventsModalDetails;
