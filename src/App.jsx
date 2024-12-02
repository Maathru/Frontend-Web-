import { useContext, useEffect, useState } from "react";
import "./App.css";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Blog from "./pages/blog/blog";
import Article from "./pages/blog/article";
import ArticleRecent1 from "./pages/blog/article_recent1";
import ArticleRecent2 from "./pages/blog/article_recent2";
import ArticleRecent3 from "./pages/blog/article_recent3";
import WriteBlog1 from "./pages/blog/writeblog1";
import WriteBlog2 from "./pages/blog/writeblog2";
import WriteBlog3 from "./pages/blog/writeblog3";
import WriteBlog4 from "./pages/blog/writeblog4";
import ArticlePreview from "./pages/blog/article_preview";
import Landing from "./pages/landing";
import Drug from "./pages/admin/manageDrugs";
import DoctorDashboard from "./pages/doctor/dashboard";
import Clinic from "./pages/doctor/clinic";
// import ViewClinics from "./pages/doctor/viewClinics";
// import ClinicDates from "./pages/doctor/clinicDates";
import ClinicReports from "./pages/doctor/clinicReports";
import Midwife from "./pages/doctor/midwife";
import Forum from "./pages/forum";
import Answer from "./pages/answer";
import EditQuestion from "./pages/editQuestion";
import Dashboard from "./pages/user/dashboard";
import { Route, Routes } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Footer from "./components/footer";
import Eligible from "./pages/user/eligible";
import Pregnancy from "./pages/pregnancycard/pregnancy";
import Growth from "./pages/user/growth";
import AskQuestion from "./pages/question";
import MidwifeDashboard from "./pages/midwife/dashboard";
import EligibleCouples from "./pages/midwife/eligibleCouples/viewAll";
import EligibleCouplesAdd from "./pages/midwife/eligibleCouples/add";
import Parents from "./pages/midwife/parents/viewAll";
import HomeVisit from "./pages/midwife/homeVisit";
import NotFound from "./pages/notFound";
import { userData } from "./context/userAuth";
import ScrollToTop from "./components/ScrollToTop";
import AdminDashboard from "./pages/admin/adminDashboard";
import ManageUsers from "./pages/admin/manageusers";
import ManageClinics from "./pages/admin/manageClinics";
import ManageRegions from "./pages/admin/manageRegions";
import ManageBlogs from "./pages/admin/manageBlogs";
import Memories from "./pages/memories";
import Healthstatics from "./pages/healthstatics";
import { ToastContainer } from "react-toastify";
import { role } from "./data/roleData";
import { ThemeProvider } from "@mui/material/styles";
import getTheme from "./theme.js";
import VaccineCard from "./pages/vaccinecard/vaccinecard";
import Nav from "./components/nav";
import { useDarkMode } from "./context/darkModeContext";
import SystemAnalytics from "./pages/admin/systemAnalytics.jsx";
import Clinics from "./pages/midwife/clinics/mohClinics";


function App() {
  const { toggleDarkMode } = useDarkMode();
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
    toggleDarkMode();
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const { userDetails } = useContext(userData);

  return (
    <ThemeProvider theme={getTheme(theme)}>
      <main className=" bg-white text-neutral-800 dark:bg-neutral-900 dark:text-neutral-100 duration-100 scroll-smooth focus:scroll-auto">
        <Nav themeFunction={handleThemeSwitch} mode={theme} />
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
          <Route path="/blogs/article/:articleId" element={<Article />} />
          <Route path="/blogs/article/recent/1" element={<ArticleRecent1 />} />
          <Route path="/blogs/article/recent/2" element={<ArticleRecent2 />} />
          <Route path="/blogs/article/recent/3" element={<ArticleRecent3 />} />
          <Route path="/forum" element={<Forum />} />
          <Route path="/forum/answer/:questionId" element={<Answer />} />

          {userDetails.authenticated && (
            <>
              {/* Admin routes */}
              {userDetails.role === role.ADMIN && (
                <>
                  <Route path="/" element={<AdminDashboard />} />
                  <Route path="/manage/blogs" element={<ManageBlogs />} />
                  <Route path="/users" element={<ManageUsers />} />
                  <Route path="/clinics" element={<ManageClinics />} />
                  <Route path="/regions" element={<ManageRegions />} />
                  <Route path="/analytics" element={<SystemAnalytics />} />
                  <Route path="/drugs" element={<Drug />} />
                </>
              )}

              {/* Admin and Doctor routes */}
              {(userDetails.role === role.ADMIN ||
                userDetails.role === role.DOCTOR) && (
                <Route path="/statistics" element={<Healthstatics />} />
              )}

              {/* Doctor routes */}
              {userDetails.role === role.DOCTOR && (
                <>
                  <Route path="/" element={<DoctorDashboard />} />

                  <Route path="/midwife" element={<Midwife />} />

                  <Route path="/clinics" element={<Clinic />} />
                  {/* <Route path="/clinics/view" element={<ViewClinics />} /> */}
                  {/* <Route path="/clinics/dates" element={<ClinicDates />} /> */}
                  <Route path="/clinics/reports" element={<ClinicReports />} />
                </>
              )}

              {/* Midwife routes */}
              {userDetails.role === role.MIDWIFE && (
                <>
                  <Route path="/" element={<MidwifeDashboard />} />
                  <Route path="/eligibles" element={<EligibleCouples />} />
                  <Route
                    path="/eligibles/add/:userId"
                    element={<EligibleCouplesAdd />}
                  />
                  <Route
                    path="/eligibles/edit/:userId/:eligibleId"
                    element={<EligibleCouplesAdd />}
                  />
                  <Route
                    path="/eligibles/view/:userId/:eligibleId"
                    element={<EligibleCouplesAdd />}
                  />
                  <Route path="/parents" element={<Parents />} />
                  <Route path="/homevisit/:userId" element={<HomeVisit />} />
                  <Route path="/clinics" element={<Clinics />} />
                </>
              )}

              {/* Midwife and Parent routes */}
              {(userDetails.role === role.MIDWIFE ||
                userDetails.role === role.PARENT) && (
                <>
                  <Route path="/pregnancy" element={<Pregnancy />} />
                </>
              )}

              {/* Parent routes */}
              {userDetails.role === role.PARENT && (
                <>
                  <Route path="/growth" element={<Growth />} />
                  <Route path="/memories" element={<Memories />} />

                  <Route path="/vaccinecard" element={<VaccineCard />} />
                </>
              )}

              {/* Parent and Eligible routes */}
              {(userDetails.role === role.PARENT ||
                userDetails.role === role.ELIGIBLE) && (
                <>
                  <Route path="/eligible" element={<Eligible />} />
                </>
              )}

              {/* Common routes */}
              <Route path="/" element={<Dashboard />} />

              <Route path="/blogs/write/1" element={<WriteBlog1 />} />
              <Route path="/blogs/write/2" element={<WriteBlog2 />} />
              <Route path="/blogs/write/3" element={<WriteBlog3 />} />
              <Route path="/blogs/write/4" element={<WriteBlog4 />} />
              <Route path="/blogs/write/preview" element={<ArticlePreview />} />

              <Route
                path="/forum/edit/:questionId"
                element={<EditQuestion />}
              />
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
