import { createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FFFFFF',
    },
    secondary: {
      main: '#DEC0F7',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          top: '70px',
          color: '#fff',
          backgroundColor: '#13031d76', // Tentando deixar o drawer mais visível
          // backgroundColor: 'inherit',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'inherit',
          color: '#DEC0F7',
        },
      },
    },
    // MuiContainer: {
    //   styleOverrides: {
    //     root: {
    //       maxWidthXl: '2000px',
    //     },
    //   },
    // },
  },
});

export default theme;
