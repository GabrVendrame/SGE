import Card from "@mui/material/Card";
import { Box, Button, ThemeProvider, Typography } from "@mui/material";
import "../styles/Itens.css";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import React from "react";
import ButtonStyles from "../styles/MuiStyles";
import img1 from "../images/e3.jpeg";
import img2 from "../images/f8.png";
import img3 from "../images/gio.jpg";
import img4 from "../images/tga.jpg";
import ModalDetails from "./ModalDetails";
import { CommitSharp } from "@mui/icons-material";

export interface Props {
  searchValues: string;

  // handleclick
}

interface EventData {
  title: string;
  description: string;
  img: string;
  value?: number;
  remainingVacancies: number;
}

const Itens: React.FC<Props> = ({ searchValues }) => {
  const [openModalDetails, setOpenModalDetails] = React.useState(false);
  const [itensData, setItensData] = React.useState<EventData>({
    title: "",
    description: "",
    img: "",
    remainingVacancies: 0,
  });

  const theme = ButtonStyles;
  const itens = [
    {
      title: "E3",
      description:
        "A Electronic Entertainment Expo, mais conhecida como E3, é uma feira internacional dedicada a jogos eletrônicos.",
      img: img1,
      value: 0.0,
      remainingVacancies: 4,
    },
    {
      title: "Titulo 2",
      description: "Descrição 2",
      img: img2,
      value: 0.0,
      remainingVacancies: 14,
    },
    {
      title: "Titulo 3",
      description: "Descrição 3",
      img: img3,
      value: 0.0,
      remainingVacancies: 2,
    },
    {
      title: "Titulo 4",
      description: "Descrição 4",
      img: img4,
      value: 0.0,
      remainingVacancies: 12,
    },
  ];

  const filteredItens = !!searchValues
    ? itens.filter((item: any) => {
        return item.title.toLowerCase().includes(searchValues.toLowerCase());
      })
    : itens;

  const HandleOpenModalDetails = (obj: EventData) => {
    setOpenModalDetails(true);
    setItensData(obj);
  };
  return (
    <ThemeProvider theme={theme}>
      <Box className="fullBody">
        <Box className="itensBody">
          <Grid
            container
            rowSpacing={"50px"}
            columnSpacing={2}
            columns={{ xs: 2, sm: 4, md: 6 }}
          >
            {filteredItens.map((item) => (
              <Grid item xs={2} sm={4} md={3}>
                <Card sx={{ background: "#1C1B1F" }}>
                  <CardMedia
                    component="img"
                    height="400"
                    image={item.img}
                    // alt="green iguana"
                  />
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      sx={{ color: "#E6E1E5" }}
                    >
                      {item.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ color: "#E6E1E5" }}
                    >
                      {item.description}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ justifyContent: "flex-end" }}>
                    <Button size="small" variant="contained" color="secondary">
                      Compartilhar
                    </Button>
                    <Button
                      size="small"
                      variant="contained"
                      color="secondary"
                      onClick={() => HandleOpenModalDetails(item)}
                    >
                      Veja mais
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
          <ModalDetails
            openModalDetails={openModalDetails}
            setOpenModalDetails={setOpenModalDetails}
            eventData={itensData}
          />
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Itens;
