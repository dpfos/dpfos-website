import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Routes, Route } from "react-router-dom";

import Layout from "./components/layout/Layout";

import Home from "./pages/Home";
import Platform from "./pages/Platform";
import Ecosystem from "./pages/Ecosystem";
import Library from "./pages/Library";
import Research from "./pages/Research";
import Technology from "./pages/Technology";
import Contact from "./pages/Contact";
import GetStarted from "./pages/GetStarted";
import BookDetail from "./data/BookDetail";
import Auth from "./pages/Auth";
import ResetPassword from "./pages/ResetPassword";

function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    const language = i18n.language?.split("-")[0] || "en";

    document.documentElement.lang = language;

    document.documentElement.dir =
      language === "ar" ? "rtl" : "ltr";
  }, [i18n.language]);

  return (
    <Layout>
      <Routes>

        {/* HOME */}
        <Route
          path="/"
          element={<Home />}
        />

        {/* PLATFORM */}
        <Route
          path="/platform"
          element={<Platform />}
        />

        {/* ECOSYSTEM */}
        <Route
          path="/ecosystem"
          element={<Ecosystem />}
        />

        {/* LIBRARY */}
        <Route
          path="/library"
          element={<Library />}
        />

        {/* BOOK DETAIL */}
        <Route
          path="/library/:slug"
          element={<BookDetail />}
        />

        {/* RESEARCH */}
        <Route
          path="/research"
          element={<Research />}
        />

        {/* TECHNOLOGY */}
        <Route
          path="/technology"
          element={<Technology />}
        />

        {/* CONTACT */}
        <Route
          path="/contact"
          element={<Contact />}
        />

        {/* GET STARTED */}
        <Route
          path="/get-started"
          element={<GetStarted />}
        />

        {/* AUTHENTICATION */}
        <Route
          path="/auth"
          element={<Auth />}
        />

        {/* PASSWORD RESET */}
        <Route
          path="/reset-password"
          element={<ResetPassword />}
        />

      </Routes>
    </Layout>
  );
}

export default App;