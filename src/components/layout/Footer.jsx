import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">

        <div className="footer-main">

          {/* BRAND */}
          <div className="footer-brand">
            <div className="footer-logo">
              <span>DPF</span>
              <strong>OS</strong>
            </div>

            <p>
              Dynamic Positional Football Operating System.
            </p>

            <span className="footer-tagline">
              The Operating System for Football.
            </span>
          </div>


          {/* PLATFORM */}
          <div className="footer-column">
            <h4>Platform</h4>

            <Link to="/platform">Platform</Link>
            <Link to="/ecosystem">Ecosystem</Link>
            <Link to="/library">Knowledge Library</Link>
            <Link to="/research">Research</Link>
            <Link to="/technology">Technology</Link>
          </div>


          {/* ACCESS */}
          <div className="footer-column">
            <h4>Access</h4>

            <Link to="/auth">Sign In</Link>
            <Link to="/get-started">Get Started</Link>
          </div>


          {/* LEGAL */}
          <div className="footer-column">
            <h4>Legal</h4>

            <Link to="/terms">Terms of Use</Link>
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/cookies">Cookie Policy</Link>
          </div>

        </div>


        {/* BOTTOM */}
        <div className="footer-bottom">

          <span>
            © {new Date().getFullYear()} DPF OS. All rights reserved.
          </span>

          <span>
            Dynamic Positional Football
          </span>

        </div>

      </div>
    </footer>
  );
}
