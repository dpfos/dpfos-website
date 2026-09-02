import { useNavigate } from "react-router-dom";
import "./ClubAccessRequired.css";

export default function ClubAccessRequired() {
  const navigate = useNavigate();

  return (
    <main className="club-access-page">
      <section className="club-access-card">
        <div className="club-access-kicker">
          DPF OS Â· CLUB OS
        </div>

        <div className="club-access-icon">
          <span>ðŸ”’</span>
        </div>

        <h1>Clubs Only</h1>

        <p className="club-access-lead">
          Club OS is the operating environment for authorized
          football organizations.
        </p>

        <p className="club-access-copy">
          This workspace provides clubs with access to their
          operational environment, structures, modules, and
          DPF-powered football intelligence.
        </p>

        <div className="club-access-actions">
          <button
            className="club-access-primary"
            onClick={() => navigate("/club")}
          >
            Explore Club OS
          </button>

          <button
            className="club-access-secondary"
            onClick={() => navigate("/contact")}
          >
            Request Club Access
          </button>
        </div>

        <div className="club-access-status">
          <span className="club-access-dot" />
          Restricted to authorized clubs
        </div>
      </section>
    </main>
  );
}
