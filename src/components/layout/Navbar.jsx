import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="navbar">
      <div className="navbar-inner">

        {/* LOGO */}
        <NavLink
          to="/"
          className="logo"
          onClick={closeMenu}
        >
          <span className="logo-main">DPF</span>
          <span className="logo-accent">OS</span>
        </NavLink>


        {/* DESKTOP NAVIGATION */}
        <nav className="nav-links">
          <NavLink to="/platform">Platform</NavLink>
          <NavLink to="/ecosystem">Ecosystem</NavLink>
          <NavLink to="/library">Library</NavLink>
          <NavLink to="/research">Research</NavLink>
          <NavLink to="/technology">Technology</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </nav>


        {/* DESKTOP CTA */}
        <NavLink
          to="/get-started"
          className="cta"
        >
          Get Started
        </NavLink>


        {/* MOBILE MENU BUTTON */}
        <button
          className={`menu-toggle ${menuOpen ? "active" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

      </div>


      {/* MOBILE NAVIGATION */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>

        <nav className="mobile-nav-links">

          <NavLink to="/platform" onClick={closeMenu}>
            Platform
          </NavLink>

          <NavLink to="/ecosystem" onClick={closeMenu}>
            Ecosystem
          </NavLink>

          <NavLink to="/library" onClick={closeMenu}>
            Library
          </NavLink>

          <NavLink to="/research" onClick={closeMenu}>
            Research
          </NavLink>

          <NavLink to="/technology" onClick={closeMenu}>
            Technology
          </NavLink>

          <NavLink to="/contact" onClick={closeMenu}>
            Contact
          </NavLink>

        </nav>


        <NavLink
          to="/get-started"
          className="mobile-cta"
          onClick={closeMenu}
        >
          Get Started
        </NavLink>

      </div>

    </header>
  );
}