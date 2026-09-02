import { NavLink, useParams } from "react-router-dom";
import { useClubRuntime } from "../runtime/useClubRuntime";
import { clubModules } from "../clubModules";
import "./ClubSidebar.css";

const dashboardItem = {
  id: "dashboard",
  name: "Dashboard",
};

export default function ClubSidebar() {
  const { clubId } = useParams();
  const { club } = useClubRuntime();

  const navigationModules = [
    dashboardItem,
    ...clubModules,
  ];

  return (
    <aside className="dpf-club-sidebar">
      <div className="dpf-club-brand">
        <span>DPF OS</span>
        <strong>CLUB OPERATING SYSTEM</strong>
      </div>

      <div className="dpf-club-identity">
        <span>{club?.metadata?.code}</span>
        <strong>{club?.name}</strong>
      </div>

      <nav className="dpf-club-nav">
        {navigationModules.map((item) => {
          const path =
            item.id === "dashboard"
              ? `/club/${clubId}`
              : `/club/${clubId}/${item.id}`;

          return (
            <NavLink
              key={item.id}
              to={path}
              end={item.id === "dashboard"}
              className={({ isActive }) =>
                `dpf-club-nav-item ${
                  isActive ? "active" : ""
                }`
              }
            >
              {item.name}
            </NavLink>
          );
        })}
      </nav>

      <div className="dpf-club-footer">
        <span>ENVIRONMENT</span>
        <strong>DEMO</strong>
      </div>
    </aside>
  );
}