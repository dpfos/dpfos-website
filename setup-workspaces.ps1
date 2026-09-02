# ============================================================
# DPF OS - Premium + Club OS Workspace Bootstrap
# Does NOT modify Search files.
# Run from the root of dpfos-web
# ============================================================

$ErrorActionPreference = "Stop"

Write-Host ""
Write-Host "============================================" -ForegroundColor Cyan
Write-Host " DPF OS WORKSPACE BOOTSTRAP" -ForegroundColor Cyan
Write-Host " Premium + Club OS + 3 Demo Clubs" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""

function Ensure-Directory($path) {
    if (!(Test-Path $path)) {
        New-Item -ItemType Directory -Path $path -Force | Out-Null
        Write-Host "[DIR ] $path" -ForegroundColor DarkCyan
    }
}

function Write-File($path, $content) {
    $directory = Split-Path $path -Parent

    if (!(Test-Path $directory)) {
        New-Item -ItemType Directory -Path $directory -Force | Out-Null
    }

    if (Test-Path $path) {
        Write-Host "[SKIP] $path already exists" -ForegroundColor Yellow
        return
    }

    Set-Content -Path $path -Value $content -Encoding UTF8
    Write-Host "[FILE] $path" -ForegroundColor Green
}

# ------------------------------------------------------------
# DIRECTORIES
# ------------------------------------------------------------

$directories = @(
    "src/features/premium",
    "src/features/premium/components",
    "src/features/premium/pages",
    "src/features/premium/styles",

    "src/features/club-os",
    "src/features/club-os/components",
    "src/features/club-os/pages",
    "src/features/club-os/styles",

    "src/data/club-os"
)

foreach ($dir in $directories) {
    Ensure-Directory $dir
}

# ============================================================
# DEMO CLUB DATA
# ============================================================

Write-File "src/data/club-os/demoClubs.js" @'
export const demoClubs = [
  {
    id: "club-01",
    code: "DPF-01",
    name: "DPF Development Club",
    shortName: "DPC",
    type: "Professional Club",
    description:
      "Core football operations environment for testing the DPF OS operating model.",
    focus: [
      "Football Operations",
      "Game Model",
      "Coaching",
      "Training",
    ],
    teams: [
      "First Team",
      "U21",
      "U18",
    ],
    players: 68,
    staff: 17,
    status: "Demo Environment",
  },

  {
    id: "club-02",
    code: "DPF-02",
    name: "DPF Academy Club",
    shortName: "DPA",
    type: "Academy Environment",
    description:
      "Academy-centered environment for Player Development and Youth Development workflows.",
    focus: [
      "Academy",
      "Youth Development",
      "Player Development",
      "Coaching",
    ],
    teams: [
      "U19",
      "U17",
      "U15",
      "U13",
    ],
    players: 104,
    staff: 24,
    status: "Demo Environment",
  },

  {
    id: "club-03",
    code: "DPF-03",
    name: "DPF Performance Club",
    shortName: "DPC+",
    type: "Full Performance Environment",
    description:
      "Full operating environment combining technical, performance, scouting and football intelligence.",
    focus: [
      "Performance",
      "Scouting",
      "Analytics",
      "Technical Operations",
    ],
    teams: [
      "First Team",
      "B Team",
      "U21",
      "U18",
    ],
    players: 82,
    staff: 31,
    status: "Demo Environment",
  },
];

export function getClubById(id) {
  return demoClubs.find((club) => club.id === id);
}
'@

# ============================================================
# PREMIUM NAVIGATION
# ============================================================

Write-File "src/features/premium/components/PremiumSidebar.jsx" @'
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
'@

Write-File "src/features/premium/components/PremiumSidebar.css" @'
.dpf-premium-sidebar {
  width: 250px;
  min-height: 100vh;
  background: #070b17;
  border-right: 1px solid rgba(255,255,255,.08);
  padding: 28px 18px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}

.dpf-premium-brand {
  padding: 4px 12px 30px;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.dpf-premium-brand span {
  color: #f5c84c;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: .22em;
}

.dpf-premium-brand strong {
  color: #fff;
  font-size: 13px;
  letter-spacing: .12em;
}

.dpf-premium-sidebar nav {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.dpf-premium-nav-item {
  color: #8e98aa;
  text-decoration: none;
  padding: 13px 12px;
  border-radius: 7px;
  font-size: 13px;
  transition: .2s ease;
}

.dpf-premium-nav-item:hover {
  color: #fff;
  background: rgba(255,255,255,.04);
}

.dpf-premium-nav-item.active {
  color: #f5c84c;
  background: rgba(245,200,76,.08);
  border-left: 2px solid #f5c84c;
}

.dpf-premium-sidebar-footer {
  margin-top: auto;
  padding: 18px 12px 5px;
  border-top: 1px solid rgba(255,255,255,.07);
  display: flex;
  justify-content: space-between;
  font-size: 9px;
  letter-spacing: .12em;
  color: #596274;
}

.dpf-premium-sidebar-footer strong {
  color: #f5c84c;
}
'@

# ============================================================
# PREMIUM LAYOUT
# ============================================================

Write-File "src/features/premium/components/PremiumLayout.jsx" @'
import { Outlet } from "react-router-dom";
import PremiumSidebar from "./PremiumSidebar";
import "../styles/PremiumLayout.css";

export default function PremiumLayout() {
  return (
    <div className="dpf-premium-layout">
      <PremiumSidebar />

      <main className="dpf-premium-main">
        <header className="dpf-premium-topbar">
          <div>
            <span className="dpf-eyebrow">DPF OS</span>
            <span className="dpf-topbar-title">Premium Workspace</span>
          </div>

          <div className="dpf-topbar-status">
            ACTIVE ACCESS
          </div>
        </header>

        <section className="dpf-premium-content">
          <Outlet />
        </section>
      </main>
    </div>
  );
}
'@

Write-File "src/features/premium/styles/PremiumLayout.css" @'
.dpf-premium-layout {
  min-height: 100vh;
  background:
    radial-gradient(circle at 85% 5%, rgba(245,200,76,.06), transparent 25%),
    #050914;
  color: #fff;
  display: flex;
}

.dpf-premium-main {
  flex: 1;
  min-width: 0;
}

.dpf-premium-topbar {
  height: 72px;
  border-bottom: 1px solid rgba(255,255,255,.07);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 34px;
  box-sizing: border-box;
}

.dpf-eyebrow {
  color: #f5c84c;
  font-size: 9px;
  letter-spacing: .18em;
  margin-right: 12px;
}

.dpf-topbar-title {
  color: #dce2ec;
  font-size: 13px;
}

.dpf-topbar-status {
  color: #7d8798;
  font-size: 9px;
  letter-spacing: .14em;
}

.dpf-premium-content {
  padding: 36px;
}

.dpf-page-title {
  margin: 0;
  font-size: 32px;
  letter-spacing: -.03em;
}

.dpf-page-subtitle {
  color: #8791a4;
  max-width: 700px;
  line-height: 1.7;
  font-size: 14px;
}

.dpf-card-grid {
  margin-top: 30px;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}

.dpf-workspace-card {
  background: rgba(255,255,255,.025);
  border: 1px solid rgba(255,255,255,.08);
  border-radius: 10px;
  padding: 22px;
}

.dpf-workspace-card h3 {
  margin: 0 0 9px;
  font-size: 15px;
}

.dpf-workspace-card p {
  margin: 0;
  color: #7f899c;
  line-height: 1.6;
  font-size: 12px;
}

@media (max-width: 900px) {
  .dpf-premium-sidebar {
    width: 210px;
  }

  .dpf-card-grid {
    grid-template-columns: 1fr;
  }
}
'@

# ============================================================
# PREMIUM PAGES
# ============================================================

Write-File "src/features/premium/pages/PremiumDashboard.jsx" @'
export default function PremiumDashboard() {
  return (
    <div>
      <h1 className="dpf-page-title">Premium Workspace</h1>

      <p className="dpf-page-subtitle">
        Your private DPF OS knowledge environment. Access protected
        knowledge, books and premium resources according to your entitlement.
      </p>

      <div className="dpf-card-grid">
        <article className="dpf-workspace-card">
          <h3>Knowledge Library</h3>
          <p>Explore the DPF OS Knowledge Library and its connected knowledge architecture.</p>
        </article>

        <article className="dpf-workspace-card">
          <h3>Protected Books</h3>
          <p>Access full editions available through your premium entitlement.</p>
        </article>

        <article className="dpf-workspace-card">
          <h3>My Workspace</h3>
          <p>Save, organize and revisit your personal DPF knowledge.</p>
        </article>
      </div>
    </div>
  );
}
'@

Write-File "src/features/premium/pages/PremiumLibrary.jsx" @'
export default function PremiumLibrary() {
  return (
    <div>
      <h1 className="dpf-page-title">Knowledge Library</h1>

      <p className="dpf-page-subtitle">
        The protected DPF OS knowledge environment.
      </p>

      <div className="dpf-card-grid">
        <article className="dpf-workspace-card">
          <h3>Foundation</h3>
          <p>Constitution, The Way, Blueprint and architectural knowledge.</p>
        </article>

        <article className="dpf-workspace-card">
          <h3>Football System</h3>
          <p>Game Model, Playbook and football operating principles.</p>
        </article>

        <article className="dpf-workspace-card">
          <h3>Development</h3>
          <p>Player Development, Academy and Youth Development.</p>
        </article>
      </div>
    </div>
  );
}
'@

Write-File "src/features/premium/pages/PremiumBooks.jsx" @'
export default function PremiumBooks() {
  return (
    <div>
      <h1 className="dpf-page-title">Books</h1>

      <p className="dpf-page-subtitle">
        Full protected editions available through premium access.
      </p>

      <div className="dpf-card-grid">
        <article className="dpf-workspace-card">
          <h3>DPF Game Model</h3>
          <p>Protected full edition.</p>
        </article>

        <article className="dpf-workspace-card">
          <h3>DPF Playbook</h3>
          <p>Protected full edition.</p>
        </article>

        <article className="dpf-workspace-card">
          <h3>DPF Player Development</h3>
          <p>Protected full edition.</p>
        </article>
      </div>
    </div>
  );
}
'@

Write-File "src/features/premium/pages/PremiumResources.jsx" @'
export default function PremiumResources() {
  return (
    <div>
      <h1 className="dpf-page-title">Premium Resources</h1>

      <p className="dpf-page-subtitle">
        Curated resources connected to the DPF OS knowledge ecosystem.
      </p>

      <div className="dpf-card-grid">
        <article className="dpf-workspace-card">
          <h3>Training Resources</h3>
          <p>Training-related resources will live here.</p>
        </article>

        <article className="dpf-workspace-card">
          <h3>Research</h3>
          <p>Research and reference materials will be connected here.</p>
        </article>

        <article className="dpf-workspace-card">
          <h3>External Resources</h3>
          <p>External resources will be linked without hosting third-party files.</p>
        </article>
      </div>
    </div>
  );
}
'@

Write-File "src/features/premium/pages/PremiumWorkspace.jsx" @'
export default function PremiumWorkspace() {
  return (
    <div>
      <h1 className="dpf-page-title">My Workspace</h1>

      <p className="dpf-page-subtitle">
        Personal area for saved knowledge, notes and future DPF workflows.
      </p>

      <div className="dpf-workspace-card" style={{ marginTop: "30px" }}>
        <h3>Workspace Ready</h3>
        <p>
          Personal knowledge tools can be connected here later without changing
          the core Premium architecture.
        </p>
      </div>
    </div>
  );
}
'@

# ============================================================
# CLUB OS SIDEBAR
# ============================================================

Write-File "src/features/club-os/components/ClubSidebar.jsx" @'
import { NavLink, useParams } from "react-router-dom";
import { getClubById } from "../../../data/club-os/demoClubs";
import "./ClubSidebar.css";

const modules = [
  ["Dashboard", ""],
  ["Club", "club"],
  ["Teams", "teams"],
  ["Players", "players"],
  ["Coaching", "coaching"],
  ["Training", "training"],
  ["Game Model", "game-model"],
  ["Performance", "performance"],
  ["Scouting", "scouting"],
  ["Academy", "academy"],
  ["Knowledge", "knowledge"],
  ["Reports", "reports"],
];

export default function ClubSidebar() {
  const { clubId } = useParams();
  const club = getClubById(clubId);

  return (
    <aside className="dpf-club-sidebar">
      <div className="dpf-club-brand">
        <span>DPF OS</span>
        <strong>CLUB OPERATING SYSTEM</strong>
      </div>

      <div className="dpf-club-identity">
        <span>{club?.code}</span>
        <strong>{club?.name}</strong>
      </div>

      <nav className="dpf-club-nav">
        {modules.map(([label, module]) => {
          const path = module
            ? `/club/${clubId}/${module}`
            : `/club/${clubId}`;

          return (
            <NavLink
              key={label}
              to={path}
              end={!module}
              className={({ isActive }) =>
                `dpf-club-nav-item ${isActive ? "active" : ""}`
              }
            >
              {label}
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
'@

Write-File "src/features/club-os/components/ClubSidebar.css" @'
.dpf-club-sidebar {
  width: 255px;
  min-height: 100vh;
  background: #060a14;
  border-right: 1px solid rgba(255,255,255,.08);
  padding: 25px 16px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

.dpf-club-brand {
  padding: 5px 12px 25px;
}

.dpf-club-brand span {
  color: #f5c84c;
  display: block;
  font-size: 11px;
  font-weight: 900;
  letter-spacing: .22em;
}

.dpf-club-brand strong {
  display: block;
  color: #737d90;
  margin-top: 6px;
  font-size: 8px;
  letter-spacing: .14em;
}

.dpf-club-identity {
  border-top: 1px solid rgba(255,255,255,.07);
  border-bottom: 1px solid rgba(255,255,255,.07);
  padding: 17px 12px;
  margin-bottom: 15px;
}

.dpf-club-identity span {
  display: block;
  color: #f5c84c;
  font-size: 8px;
  letter-spacing: .16em;
  margin-bottom: 7px;
}

.dpf-club-identity strong {
  color: #e9edf5;
  display: block;
  font-size: 12px;
  line-height: 1.4;
}

.dpf-club-nav {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.dpf-club-nav-item {
  color: #7d8798;
  text-decoration: none;
  font-size: 12px;
  padding: 10px 12px;
  border-radius: 6px;
  transition: .2s ease;
}

.dpf-club-nav-item:hover {
  color: #fff;
  background: rgba(255,255,255,.035);
}

.dpf-club-nav-item.active {
  color: #f5c84c;
  background: rgba(245,200,76,.08);
  box-shadow: inset 2px 0 #f5c84c;
}

.dpf-club-footer {
  margin-top: auto;
  padding: 17px 12px 3px;
  border-top: 1px solid rgba(255,255,255,.07);
  display: flex;
  justify-content: space-between;
  font-size: 8px;
  letter-spacing: .14em;
  color: #50596b;
}

.dpf-club-footer strong {
  color: #f5c84c;
}
'@

# ============================================================
# CLUB LAYOUT
# ============================================================

Write-File "src/features/club-os/components/ClubLayout.jsx" @'
import { Outlet, useParams } from "react-router-dom";
import ClubSidebar from "./ClubSidebar";
import { getClubById } from "../../../data/club-os/demoClubs";
import "../styles/ClubLayout.css";

export default function ClubLayout() {
  const { clubId } = useParams();
  const club = getClubById(clubId);

  return (
    <div className="dpf-club-layout">
      <ClubSidebar />

      <main className="dpf-club-main">
        <header className="dpf-club-topbar">
          <div>
            <span className="dpf-club-top-eyebrow">
              {club?.type}
            </span>

            <strong>
              {club?.name}
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
'@

Write-File "src/features/club-os/styles/ClubLayout.css" @'
.dpf-club-layout {
  min-height: 100vh;
  display: flex;
  background:
    radial-gradient(circle at 90% 0%, rgba(245,200,76,.045), transparent 28%),
    #050811;
  color: #fff;
}

.dpf-club-main {
  flex: 1;
  min-width: 0;
}

.dpf-club-topbar {
  height: 70px;
  padding: 0 32px;
  box-sizing: border-box;
  border-bottom: 1px solid rgba(255,255,255,.07);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.dpf-club-top-eyebrow {
  display: block;
  color: #f5c84c;
  font-size: 8px;
  letter-spacing: .16em;
  margin-bottom: 5px;
}

.dpf-club-topbar strong {
  color: #dfe5ef;
  font-size: 13px;
}

.dpf-club-top-status {
  color: #515b6e;
  font-size: 8px;
  letter-spacing: .14em;
}

.dpf-club-content {
  padding: 32px;
}

.dpf-club-heading {
  margin: 0;
  font-size: 30px;
  letter-spacing: -.035em;
}

.dpf-club-description {
  color: #7e889b;
  max-width: 720px;
  line-height: 1.7;
  font-size: 13px;
}

.dpf-club-stat-grid {
  margin-top: 28px;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 13px;
}

.dpf-club-stat {
  padding: 20px;
  background: rgba(255,255,255,.025);
  border: 1px solid rgba(255,255,255,.075);
  border-radius: 9px;
}

.dpf-club-stat span {
  display: block;
  color: #697386;
  font-size: 8px;
  letter-spacing: .13em;
  text-transform: uppercase;
}

.dpf-club-stat strong {
  display: block;
  margin-top: 9px;
  font-size: 25px;
  color: #f1f4f8;
}

.dpf-module-grid {
  margin-top: 28px;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
}

.dpf-module-card {
  padding: 21px;
  border: 1px solid rgba(255,255,255,.075);
  background: rgba(255,255,255,.022);
  border-radius: 9px;
}

.dpf-module-card h3 {
  margin: 0 0 8px;
  font-size: 14px;
}

.dpf-module-card p {
  margin: 0;
  color: #747e91;
  font-size: 11px;
  line-height: 1.6;
}

@media (max-width: 1000px) {
  .dpf-club-stat-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .dpf-module-grid {
    grid-template-columns: 1fr;
  }
}
'@

# ============================================================
# CLUB DASHBOARD
# ============================================================

Write-File "src/features/club-os/pages/ClubDashboard.jsx" @'
import { Link, useParams } from "react-router-dom";
import { getClubById } from "../../../data/club-os/demoClubs";

const modules = [
  ["Teams", "Manage teams, squads and football structures.", "teams"],
  ["Players", "Player profiles and development pathways.", "players"],
  ["Coaching", "Coaching operations and technical workflows.", "coaching"],
  ["Training", "Training planning and session architecture.", "training"],
  ["Game Model", "Club game model and football principles.", "game-model"],
  ["Performance", "Performance intelligence and development.", "performance"],
  ["Scouting", "Talent identification and scouting workflows.", "scouting"],
  ["Academy", "Academy and youth development operations.", "academy"],
  ["Knowledge", "DPF OS knowledge environment.", "knowledge"],
];

export default function ClubDashboard() {
  const { clubId } = useParams();
  const club = getClubById(clubId);

  return (
    <div>
      <h1 className="dpf-club-heading">
        {club?.name}
      </h1>

      <p className="dpf-club-description">
        {club?.description}
      </p>

      <div className="dpf-club-stat-grid">
        <div className="dpf-club-stat">
          <span>Teams</span>
          <strong>{club?.teams?.length || 0}</strong>
        </div>

        <div className="dpf-club-stat">
          <span>Players</span>
          <strong>{club?.players || 0}</strong>
        </div>

        <div className="dpf-club-stat">
          <span>Staff</span>
          <strong>{club?.staff || 0}</strong>
        </div>

        <div className="dpf-club-stat">
          <span>Environment</span>
          <strong>DEMO</strong>
        </div>
      </div>

      <div className="dpf-module-grid">
        {modules.map(([title, description, path]) => (
          <Link
            key={title}
            to={`/club/${clubId}/${path}`}
            className="dpf-module-card"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <h3>{title}</h3>
            <p>{description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
'@

# ============================================================
# GENERIC CLUB MODULE PAGE
# ============================================================

Write-File "src/features/club-os/pages/ClubModulePage.jsx" @'
import { useParams } from "react-router-dom";

const labels = {
  club: "Club",
  teams: "Teams",
  players: "Players",
  coaching: "Coaching",
  training: "Training",
  "game-model": "Game Model",
  performance: "Performance",
  scouting: "Scouting",
  academy: "Academy",
  knowledge: "Knowledge",
  reports: "Reports",
};

const descriptions = {
  club: "Club structure, identity, governance and operating configuration.",
  teams: "Teams, squads, staff groups and football structures.",
  players: "Player profiles, development pathways and football information.",
  coaching: "Coaching operations, methodology and technical workflows.",
  training: "Training planning, sessions, exercises and progressions.",
  "game-model": "The club Game Model and its operational football principles.",
  performance: "Performance intelligence, monitoring and development workflows.",
  scouting: "Scouting, talent identification and recruitment workflows.",
  academy: "Academy structure, youth development and player pathways.",
  knowledge: "The DPF OS knowledge layer connected to the club environment.",
  reports: "Club reports, operational outputs and decision support.",
};

export default function ClubModulePage() {
  const { module } = useParams();

  const title = labels[module] || "Club Module";
  const description =
    descriptions[module] ||
    "This DPF OS module is ready for its operational implementation.";

  return (
    <div>
      <span className="dpf-club-top-eyebrow">CLUB OS MODULE</span>

      <h1 className="dpf-club-heading">
        {title}
      </h1>

      <p className="dpf-club-description">
        {description}
      </p>

      <div
        className="dpf-module-card"
        style={{ marginTop: "28px" }}
      >
        <h3>{title} Workspace</h3>
        <p>
          Module architecture is initialized. Operational data,
          workflows, permissions and connected DPF systems can be added
          without changing the Club OS shell.
        </p>
      </div>
    </div>
  );
}
'@

# ============================================================
# CLUB SELECTOR
# ============================================================

Write-File "src/features/club-os/pages/ClubSelector.jsx" @'
import { Link } from "react-router-dom";
import { demoClubs } from "../../../data/club-os/demoClubs";

export default function ClubSelector() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#050811",
        color: "#fff",
        padding: "60px",
        boxSizing: "border-box",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <span
          style={{
            color: "#f5c84c",
            fontSize: "10px",
            letterSpacing: ".2em",
            fontWeight: 800,
          }}
        >
          DPF OS
        </span>

        <h1
          style={{
            fontSize: "42px",
            margin: "12px 0",
          }}
        >
          Club Operating System
        </h1>

        <p
          style={{
            color: "#7d8798",
            maxWidth: "700px",
            lineHeight: 1.7,
          }}
        >
          Select a demo club environment to enter the DPF OS Club Workspace.
        </p>

        <div
          style={{
            marginTop: "40px",
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "16px",
          }}
        >
          {demoClubs.map((club) => (
            <Link
              key={club.id}
              to={`/club/${club.id}`}
              style={{
                textDecoration: "none",
                color: "inherit",
                background: "rgba(255,255,255,.025)",
                border: "1px solid rgba(255,255,255,.08)",
                borderRadius: "10px",
                padding: "25px",
              }}
            >
              <span
                style={{
                  color: "#f5c84c",
                  fontSize: "9px",
                  letterSpacing: ".14em",
                }}
              >
                {club.code}
              </span>

              <h2 style={{ fontSize: "18px", margin: "10px 0" }}>
                {club.name}
              </h2>

              <p
                style={{
                  color: "#7c8698",
                  fontSize: "12px",
                  lineHeight: 1.6,
                }}
              >
                {club.description}
              </p>

              <div
                style={{
                  marginTop: "20px",
                  color: "#f5c84c",
                  fontSize: "10px",
                  letterSpacing: ".12em",
                }}
              >
                ENTER CLUB →
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
'@

# ============================================================
# ROUTE CONFIG
# ============================================================

Write-File "src/features/workspaceRoutes.jsx" @'
import { Navigate } from "react-router-dom";

import PremiumLayout from "./premium/components/PremiumLayout";
import PremiumDashboard from "./premium/pages/PremiumDashboard";
import PremiumLibrary from "./premium/pages/PremiumLibrary";
import PremiumBooks from "./premium/pages/PremiumBooks";
import PremiumResources from "./premium/pages/PremiumResources";
import PremiumWorkspace from "./premium/pages/PremiumWorkspace";

import ClubSelector from "./club-os/pages/ClubSelector";
import ClubLayout from "./club-os/components/ClubLayout";
import ClubDashboard from "./club-os/pages/ClubDashboard";
import ClubModulePage from "./club-os/pages/ClubModulePage";

export const premiumRoutes = {
  path: "/premium",
  element: <PremiumLayout />,
  children: [
    {
      index: true,
      element: <PremiumDashboard />,
    },
    {
      path: "library",
      element: <PremiumLibrary />,
    },
    {
      path: "books",
      element: <PremiumBooks />,
    },
    {
      path: "resources",
      element: <PremiumResources />,
    },
    {
      path: "workspace",
      element: <PremiumWorkspace />,
    },
  ],
};

export const clubRoutes = {
  path: "/club",
  children: [
    {
      index: true,
      element: <ClubSelector />,
    },
    {
      path: ":clubId",
      element: <ClubLayout />,
      children: [
        {
          index: true,
          element: <ClubDashboard />,
        },
        {
          path: ":module",
          element: <ClubModulePage />,
        },
      ],
    },
  ],
};
'@

# ============================================================
# README
# ============================================================

Write-File "src/features/WORKSPACE_README.md" @'
# DPF OS Workspace Architecture

## Current Scope

This folder contains the initial Premium Workspace and Club OS architecture.

### Premium

- `/premium`
- `/premium/library`
- `/premium/books`
- `/premium/resources`
- `/premium/workspace`

### Club OS

- `/club`
- `/club/club-01`
- `/club/club-02`
- `/club/club-03`

Each demo club is an isolated demo environment using the same DPF OS application core.

## Important

The Search Engine is intentionally NOT modified by this architecture.

Search files such as:

- searchIndex.js
- knowledgeIndex.js
- searchGlossary.js
- dpfMasterKnowledgeRegistry.js

remain untouched.

## Next Architecture Layers

1. Authentication
2. Subscription / Entitlement
3. Club tenancy
4. Role-based permissions
5. Real database
6. Club-specific data
7. Performance Labs
8. Knowledge integration
9. Search integration
'@

Write-Host ""
Write-Host "============================================" -ForegroundColor Green
Write-Host " DPF OS WORKSPACES CREATED" -ForegroundColor Green
Write-Host "============================================" -ForegroundColor Green
Write-Host ""
Write-Host "Premium routes:" -ForegroundColor Cyan
Write-Host "  /premium"
Write-Host "  /premium/library"
Write-Host "  /premium/books"
Write-Host "  /premium/resources"
Write-Host "  /premium/workspace"
Write-Host ""
Write-Host "Club routes:" -ForegroundColor Cyan
Write-Host "  /club"
Write-Host "  /club/club-01"
Write-Host "  /club/club-02"
Write-Host "  /club/club-03"
Write-Host ""
Write-Host "Search architecture was NOT modified." -ForegroundColor Yellow
Write-Host ""