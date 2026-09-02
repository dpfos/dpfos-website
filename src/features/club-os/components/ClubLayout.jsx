import { Outlet, useParams } from "react-router-dom";
import ClubSidebar from "./ClubSidebar";
import { ClubRuntimeProvider } from "../runtime/ClubRuntimeContext";
import { useClubRuntime } from "../runtime/useClubRuntime";
import "../styles/ClubLayout.css";

function ClubLayoutContent() {
  const { club, loading, error } =
    useClubRuntime();

  if (loading) {
    return (
      <div className="dpf-club-layout">
        <main className="dpf-club-main">
          <section className="dpf-club-content">
            Loading Club Environment...
          </section>
        </main>
      </div>
    );
  }

  if (error || !club) {
    return (
      <div className="dpf-club-layout">
        <main className="dpf-club-main">
          <section className="dpf-club-content">
            <h1>Club Not Found</h1>
            <p>
              {error ||
                "The requested club environment does not exist."}
            </p>
          </section>
        </main>
      </div>
    );
  }

  return (
    <div className="dpf-club-layout">
      <ClubSidebar />

      <main className="dpf-club-main">
        <header className="dpf-club-topbar">
          <div>
            <span className="dpf-club-top-eyebrow">
              {club.metadata?.type}
            </span>

            <strong>
              {club.name}
            </strong>
          </div>

          <div className="dpf-club-top-status">
            DPF OS / CLUB ENVIRONMENT
          </div>
        </header>

        <section className="dpf-club-content">
          <Outlet />
        </section>
      </main>
    </div>
  );
}

export default function ClubLayout() {
  const { clubId } = useParams();

  return (
    <ClubRuntimeProvider clubId={clubId}>
      <ClubLayoutContent />
    </ClubRuntimeProvider>
  );
}