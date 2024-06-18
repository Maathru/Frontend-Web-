import { useEffect, useState } from "react";
import "./App.css";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Landing from "./pages/landing";
import Drug from "./pages/drug";
import { Button } from "flowbite-react";

function App() {
  const [theme, setTheme] = useState(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const handleThemeSwitch = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="bg-white dark:bg-neutral-800">
      <Button onClick={handleThemeSwitch}>Mode Switch</Button>
      <Login />
    </div>
  );
}

export default App;
