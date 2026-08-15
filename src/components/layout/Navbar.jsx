import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../ui/LanguageSwitcher";
import "./Navbar.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { t } = useTranslation();

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const navItems = [
    {
      to: "/platform",
      label: t("navigation.platform"),
    },
    {
      to: "/ecosystem",
      label: t("navigation.ecosystem"),
    },
    {
      to: "/library",
      label: t("navigation.library"),
    },
    {
      to: "/research",
      label: t("navigation.research"),
    },
    {
      to: "/technology",
      label: t("navigation.technology"),
    },
    {
      to: "/contact",
      label: t("navigation.contact"),
    },
  ];

  return (
    <header className="navbar">
      <div className="navbar-inner">
        {/* LOGO */}
        <NavLink
          to="/"
          className="logo"
          onClick={closeMenu}
          aria-label="DPF OS Home"
        >
          <span className="logo-main">DPF</span>
          <span className="logo-accent">OS</span>
        </NavLink>

        {/* DESKTOP NAVIGATION */}
        <nav className="nav-links" aria-label="Main navigation">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* DESKTOP ACTIONS */}
        <div className="navbar-actions">
          <LanguageSwitcher />

          <NavLink to="/auth" className="sign-in-link">
            {t("navigation.signIn")}
          </NavLink>

          <NavLink to="/get-started" className="cta">
            {t("navigation.getStarted")}
          </NavLink>
        </div>

        {/* MOBILE ACTIONS */}
        <div className="mobile-actions">
          <LanguageSwitcher />

          <button
            className={`menu-toggle ${menuOpen ? "active" : ""}`}
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={menuOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      {/* MOBILE NAVIGATION */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <nav className="mobile-nav-links" aria-label="Mobile navigation">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={closeMenu}
            >
              {item.label}
            </NavLink>
          ))}

          <NavLink
            to="/auth"
            className="mobile-sign-in"
            onClick={closeMenu}
          >
            {t("navigation.signIn")}
          </NavLink>

          <NavLink
            to="/get-started"
            className="mobile-cta"
            onClick={closeMenu}
          >
            {t("navigation.getStarted")}
          </NavLink>
        </nav>
      </div>
    </header>
  );
}