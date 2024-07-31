import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "./i18n.js";
import UserAuth from "./context/userAuth.jsx";
import Loader from "./components/loader.jsx";
import { DarkModeProvider } from "./context/darkModeContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <React.Suspense fallback={<Loader />}>
      <Router>
        <UserAuth>
          <DarkModeProvider>
            <App />
          </DarkModeProvider>
        </UserAuth>
      </Router>
    </React.Suspense>
  </React.StrictMode>
);
