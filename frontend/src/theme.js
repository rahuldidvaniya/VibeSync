import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1DB954', 
    },
    background: {
      default: '#121212', 
      paper: '#181818',
    },
    text: {
      primary: '#ffffff',
      secondary: '#b3b3b3', 
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
});

export default theme;
