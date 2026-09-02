import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import LanguageSwitcher from "../ui/LanguageSwitcher";
import SearchOverlay from "../../features/search/SearchOverlay";
import { useDPFAuth } from "../../core/index.js";

import "./Navbar.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const { t } = useTranslation();
  const navigate = useNavigate();

  const {
    session,
    loading,
    signOut,
  } = useDPFAuth();

  const isAuthenticated =
    !loading && Boolean(session?.isAuthenticated);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const openSearch = () => {
    setMenuOpen(false);
    setSearchOpen(true);
  };

  const closeSearch = () => {
    setSearchOpen(false);
  };

  const handleSignOut = async () => {
    closeMenu();
    await signOut();
    navigate("/");
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
    <>
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
          <nav
            className="nav-links"
            aria-label="Main navigation"
          >
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>


          {/* DESKTOP ACTIONS */}
          <div className="navbar-actions">

            {/* SEARCH */}
            <button
              type="button"
              className="navbar-search"
              onClick={openSearch}
              aria-label="Search DPF OS"
              title="Search DPF OS"
            >
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <circle
                  cx="11"
                  cy="11"
                  r="6.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                />

                <path
                  d="M16 16L21 21"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            </button>

            <LanguageSwitcher />

            {!loading && isAuthenticated ? (
              <button
                type="button"
                className="sign-in-link"
                onClick={handleSignOut}
              >
                Sign Out
              </button>
            ) : (
              <NavLink
                to="/auth"
                className="sign-in-link"
              >
                {t("navigation.signIn")}
              </NavLink>
            )}

            <NavLink
              to="/get-started"
              className="cta"
            >
              {t("navigation.getStarted")}
            </NavLink>

          </div>


          {/* MOBILE ACTIONS */}
          <div className="mobile-actions">

            <button
              type="button"
              className="navbar-search mobile-search"
              onClick={openSearch}
              aria-label="Search DPF OS"
              title="Search DPF OS"
            >
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <circle
                  cx="11"
                  cy="11"
                  r="6.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                />

                <path
                  d="M16 16L21 21"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            </button>

            <LanguageSwitcher />

            <button
              className={`menu-toggle ${
                menuOpen ? "active" : ""
              }`}
              onClick={() =>
                setMenuOpen((open) => !open)
              }
              aria-label={
                menuOpen
                  ? "Close navigation"
                  : "Open navigation"
              }
              aria-expanded={menuOpen}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>

          </div>

        </div>


        {/* MOBILE NAVIGATION */}
        <div
          className={`mobile-menu ${
            menuOpen ? "open" : ""
          }`}
        >
          <nav
            className="mobile-nav-links"
            aria-label="Mobile navigation"
          >
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={closeMenu}
              >
                {item.label}
              </NavLink>
            ))}

            {!loading && isAuthenticated ? (
              <button
                type="button"
                className="mobile-sign-in"
                onClick={handleSignOut}
              >
                Sign Out
              </button>
            ) : (
              <NavLink
                to="/auth"
                className="mobile-sign-in"
                onClick={closeMenu}
              >
                {t("navigation.signIn")}
              </NavLink>
            )}

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


      {/* GLOBAL SEARCH */}
      <SearchOverlay
        open={searchOpen}
        onClose={closeSearch}
      />
    </>
  );
}