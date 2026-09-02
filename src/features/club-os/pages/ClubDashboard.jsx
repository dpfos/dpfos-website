import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useClubRuntime } from "../runtime/useClubRuntime";
import { clubModules } from "../clubModules";

export default function ClubDashboard() {
  const { clubId } = useParams();
  const {
    club,
    teams,
    loading,
    error,
  } = useClubRuntime();

  if (loading) {
    return (
      <div>
        <h1 className="dpf-club-heading">
          Loading Club...
        </h1>
      </div>
    );
  }

  if (error || !club) {
    return (
      <div>
        <h1 className="dpf-club-heading">
          Club Not Found
        </h1>

        <p className="dpf-club-description">
          {error ||
            "The requested club environment does not exist."}
        </p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="dpf-club-heading">
        {club.name}
      </h1>

      <p className="dpf-club-description">
        {club.metadata?.description}
      </p>

      <div className="dpf-club-stat-grid">
        <div className="dpf-club-stat">
          <span>Teams</span>
          <strong>
            {teams.length}
          </strong>
        </div>

        <div className="dpf-club-stat">
          <span>Players</span>
          <strong>0</strong>
        </div>

        <div className="dpf-club-stat">
          <span>Staff</span>
          <strong>0</strong>
        </div>

        <div className="dpf-club-stat">
          <span>Environment</span>
          <strong>DEMO</strong>
        </div>
      </div>

      <div className="dpf-module-grid">
        {clubModules.map((module) => (
          <Link
            key={module.id}
            to={`/club/${clubId}/${module.id}`}
            style={{
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <h3>{module.name}</h3>
            <p>{module.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}