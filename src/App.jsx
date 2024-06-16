import { useState } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Landing from "./pages/landing";
import Drug from "./pages/drug";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Drug />
    </>
  );
}

export default App;
