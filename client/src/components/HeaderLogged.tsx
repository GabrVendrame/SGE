import "../styles/Header.css";
import { ThemeProvider } from "@mui/material/styles";
import { AppBar, Button, IconButton, Toolbar } from "@mui/material";
import Box from "@mui/material/Box/Box";
import { Link, useNavigate } from "react-router-dom";

import MenuIcon from "@mui/icons-material/Menu";
import React from "react";
import MuiStyles from "../styles/MuiStyles";
import logo from "../images/logo.png";
import ModalDetails from "./ModalDetails2";

// const pages = ['Sobre nós', 'FAQ', 'Contato'];
interface Props {
  isOpenDrawer: boolean;
  setIsOpenDrawer: React.Dispatch<React.SetStateAction<boolean>>;
  pages: { id: number; text: string }[];
}

const HeaderLogged: React.FC<Props> = ({
  isOpenDrawer,
  setIsOpenDrawer,
  pages,
}) => {
  const theme = MuiStyles;
  const navigate = useNavigate();
  const [openModalDetails, setOpenModalDetails] = React.useState(false);
  const logout = () => {
    localStorage.removeItem("token");
    console.log("saindo");
    alert("saindo");
    navigate("/");
  };

  const handleOpenNavMenu = () => {
    setIsOpenDrawer(!isOpenDrawer);
  };

  const handlePageSelect = (id: number) => {
    // setAnchorElNav(null);
    console.log(id);
  };

  const HandleOpenModalDetails = () => {
    setOpenModalDetails(true);
    console.log("fon");
    // console.log(`Apresentações: ${Presentations}`);
  };

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static">
        {/* <Container className='containerHeader'> */}
        <Toolbar disableGutters>
          <Box
            className="logoAndName"
            sx={{ display: { xs: "none", sm: "flex" } }}
          >
            <Link to="/HomeUser">
              <img src={logo} alt="S-logo" className="logo" />
            </Link>
            <Link
              to="/HomeUser"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Box className="projectName">SOGEI Project</Box>
            </Link>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", sm: "none" } }}>
            <IconButton
              size="small"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", sm: "none" } }}>
            <Link to="/HomeUser">
              <img src={logo} alt="S-logo" className="logo" />
            </Link>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "none", sm: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page.id}
                onClick={() => handlePageSelect(page.id)}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page.text}
              </Button>
            ))}
          </Box>

          <Button
            onClick={() => logout()}
            color="secondary"
            variant="contained"
            sx={{
              display: { xs: "none", sm: "flex" },
              position: "absolute",
              right: "10px",
              top: 15,
            }}
          >
            Sair
          </Button>
          <Button
            onClick={() => HandleOpenModalDetails()}
            //onClick={() => HandleOpenModalDetails(item)}
            color="secondary"
            variant="contained"
            sx={{
              display: { xs: "none", sm: "flex" },
              position: "absolute",
              right: "80px",
              top: 15,
            }}
          >
            Minha conta
          </Button>
        </Toolbar>
        <ModalDetails
          openModalDetails={openModalDetails}
          setOpenModalDetails={setOpenModalDetails}
        />
        {/* </Container> */}
      </AppBar>
    </ThemeProvider>
  );
};

export default HeaderLogged;
