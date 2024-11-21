import { createTheme, ThemeOptions } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    gradients: {
      primary: string;
      dark: string;
      card: string;
    };
  }
  
  interface PaletteOptions {
    gradients?: {
      primary: string;
      dark: string;
      card: string;
    };
  }

  interface TypeBackground {
    elevation1: string;
    elevation2: string;
  }
}

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1DB954',
      light: '#1ED760',
      dark: '#169C46',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#20D789',
      light: '#3DDFA3',
      dark: '#18A66A',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#0A0A0A',
      paper: '#121212',
      elevation1: '#181818',
      elevation2: '#282828',
    },
    text: {
      primary: '#FFFFFF',
      secondary: 'rgba(255, 255, 255, 0.7)',
      disabled: 'rgba(255, 255, 255, 0.5)',
    },
    success: {
      main: '#1DB954',
      light: '#1ED760',
      dark: '#169C46',
    },
    error: {
      main: '#FF5757',
      light: '#FF7070',
      dark: '#E64D4D',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #1DB954 0%, #20D789 100%)',
      dark: 'linear-gradient(180deg, #0A0A0A 0%, #121212 100%)',
      card: 'linear-gradient(145deg, rgba(24, 24, 24, 0.9) 0%, rgba(18, 18, 18, 0.8) 100%)',
    },
  },
  typography: {
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    h1: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: 700,
      letterSpacing: '-0.01em',
    },
    h4: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: 600,
      letterSpacing: '-0.01em',
    },
    h6: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: 600,
    },
    button: {
      fontFamily: '"Inter", sans-serif',
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontFamily: '"Inter", sans-serif',
          fontWeight: 500,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '12px',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiSnackbar: {
      styleOverrides: {
        root: {
          '& .MuiAlert-root': {
            borderRadius: '12px',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
  },
} as ThemeOptions);

export default theme;