import { NavLink } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="container navbar-inner">

        <NavLink to="/" className="logo">
          <span className="logo-main">DPF</span>
          <span className="logo-accent">OS</span>
        </NavLink>

        <nav className="nav-links">

          <NavLink to="/platform">
            Platform
          </NavLink>

          <NavLink to="/ecosystem">
            Ecosystem
          </NavLink>

          <NavLink to="/library">
            Library
          </NavLink>

          <NavLink to="/research">
            Research
          </NavLink>

          <NavLink to="/technology">
            Technology
          </NavLink>

          <NavLink to="/contact">
            Contact
          </NavLink>

        </nav>

        <NavLink to="/contact" className="cta">
          Get Started
        </NavLink>

      </div>
    </header>
  );
}
