import { useContext, useEffect, useState } from "react";
import "./App.css";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Blog from "./pages/blog/blog";
import Article from "./pages/blog/article";
import WriteBlog1 from "./pages/blog/writeblog1";
import WriteBlog2 from "./pages/blog/writeblog2";
import Navbar from "./components/navbar";
import Landing from "./pages/landing";
import Drug from "./pages/drug";
import DrugAdd from "./pages/drugAdd";
import Clinic from "./pages/doctor/clinic";
import ViewClinics from "./pages/doctor/viewClinics";
import ClinicDates from "./pages/doctor/clinicDates";
import ClinicReports from "./pages/doctor/clinicReports";
import Forum from "./pages/forum";
import Answer from "./pages/answer";
import Dashboard from "./pages/user/dashboard";
import { Route, Routes } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Footer from "./components/footer";
import Eligible1 from "./pages/user/eligible1";
import Eligible2 from "./pages/user/eligible2";
import Eligible3 from "./pages/user/eligible3";
import Eligible4 from "./pages/user/eligible4";
import Eligible5 from "./pages/user/eligible5";
import Growth from "./pages/user/growth";
import AskQuestion from "./pages/question";
import MidwifeDashboard from "./pages/midwife/dashboard";
import EligibleCouples from "./pages/midwife/eligibleCouples/viewAll";
import EligibleCouplesAdd from "./pages/midwife/eligibleCouples/add";
import Parents from "./pages/midwife/parents/viewAll";
import NotFound from "./pages/notFound";
import { userData } from "./context/userAuth";
import ScrollToTop from "./components/ScrollToTop";
import ManageUsers from "./pages/manageusers";
import { ToastContainer } from "react-toastify";
import { role } from "./data/roleData";
import { ThemeProvider } from "@mui/material/styles";
import getTheme from "./theme.js";

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

  const { userDetails } = useContext(userData);

  return (
    <ThemeProvider theme={getTheme(theme)}>
      <main className=" bg-white text-neutral-800 dark:bg-neutral-900 dark:text-neutral-100 duration-100 scroll-smooth focus:scroll-auto">
        <Navbar themeFunction={handleThemeSwitch} mode={theme} />
        <ScrollToTop />

        <Routes>
          {!userDetails.authenticated && (
            <>
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </>
          )}

          <Route path="/blogs" element={<Blog />} />
          <Route path="/blogs/article" element={<Article />} />
          <Route path="/forum" element={<Forum />} />
          <Route path="/forum/answer/:questionId" element={<Answer />} />

          {userDetails.authenticated && (
            <>
              {/* Admin routes */}
              {userDetails.role === role.ADMIN && (
                <>
                  <Route path="/users" element={<ManageUsers />} />
                </>
              )}

              {/* Doctor routes */}
              {userDetails.role === role.DOCTOR && (
                <>
                  <Route path="/drugs" element={<Drug />} />
                  <Route path="/drugs/add" element={<DrugAdd />} />

                  <Route path="/clinics" element={<Clinic />} />
                  <Route path="/clinics/view" element={<ViewClinics />} />
                  <Route path="/clinics/dates" element={<ClinicDates />} />
                  <Route path="/clinics/reports" element={<ClinicReports />} />
                </>
              )}

              {/* Midwife routes */}
              {userDetails.role === role.MIDWIFE && (
                <>
                  <Route path="/midwife" element={<MidwifeDashboard />} />
                  <Route path="/eligible" element={<EligibleCouples />} />
                  <Route
                    path="/eligible/add/:userId/:eligibleId"
                    element={<EligibleCouplesAdd />}
                  />
                  <Route
                    path="/eligible/edit/:userId/:eligibleId"
                    element={<EligibleCouplesAdd />}
                  />
                  <Route
                    path="/eligible/view/:userId/:eligibleId"
                    element={<EligibleCouplesAdd />}
                  />
                  <Route path="/parents" element={<Parents />} />
                </>
              )}

              {/* Parent routes */}
              {userDetails.role === role.PARENT && (
                <>
                  <Route path="/growth" element={<Growth />} />
                </>
              )}

              {/* Parent and Eligible routes */}
              {(userDetails.role === role.PARENT ||
                userDetails.role === role.ELIGIBLE) && (
                <>
                  <Route path="/eligible/1" element={<Eligible1 />} />
                  <Route path="/eligible/2" element={<Eligible2 />} />
                  <Route path="/eligible/3" element={<Eligible3 />} />
                  <Route path="/eligible/4" element={<Eligible4 />} />
                  <Route path="/eligible/5" element={<Eligible5 />} />
                </>
              )}

              {/* Common routes */}
              <Route path="/" element={<Dashboard />} />

              <Route path="/blogs/write/1" element={<WriteBlog1 />} />
              <Route path="/blogs/write/2" element={<WriteBlog2 />} />

              <Route path="/forum/ask" element={<AskQuestion />} />
            </>
          )}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ToastContainer />
        <Footer />
      </main>
    </ThemeProvider>
  );
}

export default App;
