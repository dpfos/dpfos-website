import "./Layout.css";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";

export default function Layout({ children }) {
  return (
    <div className="site-layout">
      <Navbar />

      <main className="site-main">
        {children}
      </main>

      <Footer />
    </div>
  );
}