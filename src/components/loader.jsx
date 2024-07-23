import { CircularProgress, Box } from "@mui/material";
import logo from "../assets/logo.png";

const Loader = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <img src={logo} alt="Logo" style={{ width: 200, marginBottom: 30 }} />
      <CircularProgress sx={{ color: "#ff6ccc" }} />
    </Box>
  );
};

export default Loader;
