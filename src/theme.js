import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    h5: {
      fontSize: '24px',
      fontWeight: 500,
      color: '#000000',
      margin: "10px 0 10px 0"
    },
    h6: {
      fontSize: '20px',
      fontWeight: 200,
      color: '#5B5B5B',
      margin: '20px 0 10px 0',
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '&.rounded': {
            '& .MuiOutlinedInput-root': {
              borderRadius: 30,
              boxShadow: "0 4px 20px rgba(168, 88, 196, 0.15)",
              padding: 4,
            },
          },
        },
      },
    },
  },
});

export default theme;