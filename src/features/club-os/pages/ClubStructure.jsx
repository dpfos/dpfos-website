import { useClubRuntime } from "../runtime/useClubRuntime";
import "../styles/ClubStructure.css";

export default function ClubStructure() {
  const {
    club,
    teams,
    loading,
    error,
  } = useClubRuntime();

  if (loading) {
    return (
      <div className="club-structure-empty">
        <h1>Loading Club...</h1>
      </div>
    );
  }

  if (error || !club) {
    return (
      <div className="club-structure-empty">
        <h1>Club Not Found</h1>
        <p>
          {error ||
            "The requested club environment does not exist."}
        </p>
      </div>
    );
  }

  return (
    <div className="club-structure">

      <header className="club-structure-header">
        <div>
          <span className="club-label">
            CLUB STRUCTURE
          </span>

          <h1>{club.name}</h1>

          <p>
            {club.metadata?.description}
          </p>
        </div>

        <div className="club-identity-badge">
          <span>
            {club.metadata?.code}
          </span>

          <strong>
            {club.metadata?.shortName}
          </strong>
        </div>
      </header>


      <section className="club-structure-section">

        <div className="club-section-title">
          <span>01</span>

          <div>
            <small>
              ORGANIZATIONAL STRUCTURE
            </small>

            <h2>Teams</h2>
          </div>
        </div>

        <div className="club-team-grid">
          {teams.map((team) => (
            <div
              className="club-team-card"
              key={team.id}
            >
              <span>
                {team.category}
              </span>

              <h3>{team.name}</h3>

              <strong>—</strong>

              <small>
                REGISTERED PLAYERS
              </small>
            </div>
          ))}
        </div>

        {teams.length === 0 && (
          <p>
            No teams are currently registered
            for this club.
          </p>
        )}

      </section>


      <section className="club-structure-section">

        <div className="club-section-title">
          <span>02</span>

          <div>
            <small>
              HUMAN STRUCTURE
            </small>

            <h2>Staff</h2>
          </div>
        </div>

        <div className="club-staff-panel">

          <div className="club-staff-total">
            <span>
              TOTAL STAFF
            </span>

            <strong>—</strong>
          </div>

          <div className="club-department-list">
            <div className="club-department-item">
              <span>
                Staff data not yet connected
              </span>

              <span>
                CORE DOMAIN PENDING
              </span>
            </div>
          </div>

        </div>

      </section>


      <section className="club-structure-section">

        <div className="club-section-title">
          <span>03</span>

          <div>
            <small>
              OPERATING MODEL
            </small>

            <h2>Departments</h2>
          </div>
        </div>

        <div className="club-department-grid">

          <div className="club-department-card">
            <span>—</span>

            <h3>
              Department model not yet connected
            </h3>

            <small>
              CORE DOMAIN PENDING
            </small>
          </div>

        </div>

      </section>

    </div>
  );
}