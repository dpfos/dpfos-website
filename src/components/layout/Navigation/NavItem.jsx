import { NavLink } from "react-router-dom";

export default function NavItem({ title, href }) {
  return (
    <NavLink
      to={href}
      className={({ isActive }) =>
        isActive ? "nav-link active" : "nav-link"
      }
    >
      {title}
    </NavLink>
  );
}
