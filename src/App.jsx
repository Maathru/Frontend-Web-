import { useState } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Blog from "./pages/blog";
import Navbar from "./components/navbar";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Blog />
    </>
  );
}

export default App;
