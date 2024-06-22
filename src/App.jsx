import { useEffect, useState } from "react";
import "./App.css";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Blog from "./pages/blog";
import Navbar from "./components/navbar";
import Landing from "./pages/landing";
import Drug from "./pages/drug";
import DrugAdd from "./pages/drugAdd";
import Clinic from "./pages/clinic";
import { Button } from "flowbite-react";
import { Route, Routes } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSelector from "./components/language-selector";
import Article from "./pages/article";

function App() {
  const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");

  darkQuery.addEventListener("change", (e) => {
    if (e.matches) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  });

  const [theme, setTheme] = useState(
    localStorage.getItem("theme")
      ? localStorage.getItem("theme")
      : darkQuery.matches
  );
  const { t } = useTranslation("common");

  function onWindowMatch() {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) && darkQuery.matches)
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }

  onWindowMatch();

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  const handleThemeSwitch = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <main className="bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-100 duration-100 scroll-smooth focus:scroll-auto">
      <Navbar themeFunction={handleThemeSwitch} mode={theme} />

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/drugs" element={<Drug />} />
        <Route path="/drugs/add" element={<DrugAdd />} />
        <Route path="/blogs" element={<Blog />} />
        <Route path="/blogs/article" element={<Article />} />
        <Route path="/clinics" element={<Clinic />} />
      </Routes>
    </main>
  );
}

export default App;
