import { NavLink } from "react-router-dom";
import "./PremiumSidebar.css";

const items = [
  { label: "Overview", path: "/premium" },
  { label: "Knowledge Library", path: "/premium/library" },
  { label: "Books", path: "/premium/books" },
  { label: "Resources", path: "/premium/resources" },
  { label: "My Workspace", path: "/premium/workspace" },
];

export default function PremiumSidebar() {
  return (
    <aside className="dpf-premium-sidebar">
      <div className="dpf-premium-brand">
        <span>DPF OS</span>
        <strong>PREMIUM</strong>
      </div>

      <nav>
        {items.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/premium"}
            className={({ isActive }) =>
              `dpf-premium-nav-item ${isActive ? "active" : ""}`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="dpf-premium-sidebar-footer">
        <span>Knowledge Access</span>
        <strong>PREMIUM</strong>
      </div>
    </aside>
  );
}
