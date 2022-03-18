import { Color, createTheme } from '@material-ui/core';
import { makeStyles, PropsFunc } from '@material-ui/styles';
import { styled } from '@material-ui/core/styles';
// interface teste {
//   color: Color;
// }

// const useStyles = makeStyles({
//   root: {
//     color: '#ffffff',
//   },
// });

// interface propsButtonStyles {
//   textTransform: 'none' | 'lowercase';
// }

// const styledButtom = styled('button')((props: propsButtonStyles) => ({
//   textTransform: props.textTransform,
// }));

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
  },
});

export default theme;
