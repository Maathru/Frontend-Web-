import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "./i18n.js";
import UserAuth from "./context/userAuth.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <React.Suspense fallback="Loading...">
      <Router>
        <UserAuth>
          <App />
        </UserAuth>
      </Router>
    </React.Suspense>
  </React.StrictMode>
);
