import { createTheme } from "@mui/material/styles";

const getTheme = (mode) =>
  createTheme({
    palette: {
      mode,
    },
    typography: {
      h4: {
        fontSize: "26px",
        fontWeight: 600,
        margin: "20px 0 10px 0",
      },
      h5: {
        fontSize: "24px",
        fontWeight: 500,
        color: mode === "dark" ? "#d1ced6" : "#000000", // Change color based on mode
        margin: "10px 0 10px 0",
      },
      h6: {
        fontSize: "20px",
        fontWeight: 200,
        color: mode === "dark" ? "#d1ced6" : "#5B5B5B",
        margin: "20px 0 10px 0",
      },
    },
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            "&.rounded": {
              "& .MuiOutlinedInput-root": {
                borderRadius: 30,
                boxShadow: "0 4px 20px rgba(168, 88, 196, 0.15)",
                padding: 4,
              },
            },
          },
        },
      },
      MuiSelect: {
        styleOverrides: {
          root: {
            "&.rounded": {
              "& .MuiOutlinedInput-root": {
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

export default getTheme;
