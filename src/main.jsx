import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "./i18n.js";
import UserAuth from "./context/userAuth.jsx";
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme.js';

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <React.Suspense fallback="Loading...">
      <Router>
        <UserAuth>
        <ThemeProvider theme={theme}> 
          <App />
          </ThemeProvider>
        </UserAuth>
      </Router>
    </React.Suspense>
  </React.StrictMode>
);
