import NavItem from "./NavItem";

const links = [
  { title: "Platform", href: "/platform" },
  { title: "Ecosystem", href: "/ecosystem" },
  { title: "Library", href: "/library" },
  { title: "Research", href: "/research" },
  { title: "Technology", href: "/technology" },
  { title: "Contact", href: "/contact" },
];

export default function NavMenu() {
  return (
    <nav className="nav-menu">
      {links.map((link) => (
        <NavItem key={link.href} {...link} />
      ))}
    </nav>
  );
}
