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

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/platform" element={<Platform />} />
        <Route path="/ecosystem" element={<Ecosystem />} />
        <Route path="/library" element={<Library />} />
        <Route path="/research" element={<Research />} />
        <Route path="/technology" element={<Technology />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/get-started" element={<GetStarted />} />
      </Routes>
    </Layout>
  );
}

export default App;
