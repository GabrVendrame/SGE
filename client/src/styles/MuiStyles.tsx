import { createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FFFFFF',
    },
    secondary: {
      main: '#DEC0F7',
    },
    plusOneItem: {
      main: '#6750A4',
    },
    minusOneItem: {
      main: '#B20505',
    }
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#C3BFC3',
              // borderColor: 'none',
            },
            '&:hover fieldset': {
              borderColor: '#ffffff',
              // borderColor: '#000000',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#DEC0F7',
              // borderColor: '#580899',
            },
            // backgroundColor: '#ffffff',
            // borderRadius: '25px',
            WebkitTextFillColor: '#ffffff',
          },
        },
      },
    },
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
  },
});

declare module '@mui/material/styles' {
  interface Palette {
    plusOneItem: Palette['primary'];
    minusOneItem: Palette['primary'];
  }

  // allow configuration using `createTheme`
  interface PaletteOptions {
    plusOneItem?: PaletteOptions['primary'];
    minusOneItem?: PaletteOptions['primary'];
  }
}

// Update the Button's color prop options
declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    plusOneItem: true;
    minusOneItem: true;
  }
}

export default theme;
