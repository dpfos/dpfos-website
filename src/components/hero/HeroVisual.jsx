import "./HeroVisual.css";

const modules = [
  {
    number: "01",
    title: "GAME",
    subtitle: "Game Model · Principles · Logic",
  },
  {
    number: "02",
    title: "TACTICAL",
    subtitle: "Structures · Behaviors · Playbook",
  },
  {
    number: "03",
    title: "PLAYER",
    subtitle: "Roles · Development · Profiles",
  },
  {
    number: "04",
    title: "COACHING",
    subtitle: "Training · Methodology · Practice",
  },
  {
    number: "05",
    title: "PERFORMANCE",
    subtitle: "Monitoring · KPIs · Decision Support",
  },
  {
    number: "06",
    title: "INTELLIGENCE",
    subtitle: "Analytics · Research · Insights",
  },
  {
    number: "07",
    title: "KNOWLEDGE",
    subtitle: "Library · Principles · Frameworks",
  },
  {
    number: "08",
    title: "TECHNOLOGY",
    subtitle: "Platform · Infrastructure · Security",
  },
];

export default function HeroVisual() {
  return (
    <div className="hero-visual">

      {/* SPACE FIELD */}
      <div className="hero-visual__space" />

      {/* ORBIT SYSTEM */}
      <div className="hero-orbit hero-orbit--one" />
      <div className="hero-orbit hero-orbit--two" />
      <div className="hero-orbit hero-orbit--three" />

      {/* CENTRAL SYSTEM */}
      <div className="hero-core">

        <div className="hero-core__halo" />

        <div className="hero-core__ring hero-core__ring--outer" />
        <div className="hero-core__ring hero-core__ring--middle" />
        <div className="hero-core__ring hero-core__ring--inner" />

        <div className="hero-core__energy" />

        <div className="hero-core__ball">
          <span />
          <span />
          <span />
        </div>

        <div className="hero-core__label">
          <strong>DPF OS</strong>
          <small>CORE ENGINE</small>
        </div>

      </div>

      {/* SATELLITE NODES */}
      <div className="hero-node hero-node--clubs">
        <strong>CLUBS</strong>
        <span>Worldwide Network</span>
      </div>

      <div className="hero-node hero-node--federations">
        <strong>FEDERATIONS</strong>
        <span>Strategic Partners</span>
      </div>

      <div className="hero-node hero-node--academies">
        <strong>ACADEMIES</strong>
        <span>Development System</span>
      </div>

      {/* =========================================
    DPF PITCH DATA ENVIRONMENT
    REAL FOOTBALL PITCH + DPF 18 ZONES
========================================= */}

<div className="dpf-hero__pitch">

  <div className="dpf-hero__pitch-surface">

    {/* =====================================
        REAL FOOTBALL PITCH
    ===================================== */}

    <svg
      className="dpf-hero__pitch-svg"
      viewBox="0 0 1000 400"
      preserveAspectRatio="none"
      aria-hidden="true"
    >

      {/* -------------------------------------
          PITCH ATMOSPHERE
      ------------------------------------- */}

      <defs>

        <linearGradient
          id="dpfPitchSurface"
          x1="0"
          y1="0"
          x2="0"
          y2="1"
        >
          <stop
            offset="0%"
            stopColor="rgba(0, 190, 230, 0.035)"
          />

          <stop
            offset="100%"
            stopColor="rgba(0, 110, 180, 0.075)"
          />
        </linearGradient>

      </defs>


      {/* -------------------------------------
          PITCH SURFACE
      ------------------------------------- */}

      <rect
        x="100"
        y="60"
        width="800"
        height="280"
        fill="url(#dpfPitchSurface)"
      />


      {/* =====================================
          DPF FINE DATA GRID
      ===================================== */}

      <g
        className="dpf-pitch-fine-grid"
        aria-hidden="true"
      >

        {/* Vertical grid */}
        {Array.from({ length: 21 }).map((_, index) => (
          <line
            key={`vg-${index}`}
            x1={100 + index * 40}
            y1="60"
            x2={100 + index * 40}
            y2="340"
          />
        ))}

        {/* Horizontal grid */}
        {Array.from({ length: 15 }).map((_, index) => (
          <line
            key={`hg-${index}`}
            x1="100"
            y1={60 + index * 20}
            x2="900"
            y2={60 + index * 20}
          />
        ))}

      </g>


      {/* =====================================
          DPF 18 LONGITUDINAL ZONES
      ===================================== */}

      <g
        className="dpf-pitch-zones"
        aria-hidden="true"
      >

        {Array.from({ length: 17 }).map((_, index) => {
          const x = 100 + ((index + 1) * 800) / 18;

          return (
            <line
              key={`zone-${index}`}
              x1={x}
              y1="60"
              x2={x}
              y2="340"
            />
          );
        })}

      </g>


      {/* =====================================
          OUTER PITCH BOUNDARY
      ===================================== */}

      <rect
        className="dpf-pitch-line"
        x="100"
        y="60"
        width="800"
        height="280"
      />


      {/* =====================================
          CENTER LINE
      ===================================== */}

      <line
        className="dpf-pitch-line"
        x1="500"
        y1="60"
        x2="500"
        y2="340"
      />


      {/* =====================================
          CENTER CIRCLE
      ===================================== */}

      <circle
        className="dpf-pitch-line"
        cx="500"
        cy="200"
        r="48"
      />

      <circle
        className="dpf-pitch-center-point"
        cx="500"
        cy="200"
        r="4"
      />


      {/* =====================================
          LEFT PENALTY AREA
      ===================================== */}

      <rect
        className="dpf-pitch-line"
        x="100"
        y="125"
        width="120"
        height="150"
      />


      {/* LEFT 6-YARD BOX */}

      <rect
        className="dpf-pitch-line"
        x="100"
        y="165"
        width="55"
        height="70"
      />


      {/* LEFT PENALTY SPOT */}

      <circle
        className="dpf-pitch-dot"
        cx="180"
        cy="200"
        r="3"
      />


      {/* LEFT PENALTY ARC */}

      <path
        className="dpf-pitch-line"
        d="
          M 220 158
          A 48 48 0 0 0 220 242
        "
        fill="none"
      />


      {/* =====================================
          RIGHT PENALTY AREA
      ===================================== */}

      <rect
        className="dpf-pitch-line"
        x="780"
        y="125"
        width="120"
        height="150"
      />


      {/* RIGHT 6-YARD BOX */}

      <rect
        className="dpf-pitch-line"
        x="845"
        y="165"
        width="55"
        height="70"
      />


      {/* RIGHT PENALTY SPOT */}

      <circle
        className="dpf-pitch-dot"
        cx="820"
        cy="200"
        r="3"
      />


      {/* RIGHT PENALTY ARC */}

      <path
        className="dpf-pitch-line"
        d="
          M 780 158
          A 48 48 0 0 1 780 242
        "
        fill="none"
      />


      {/* =====================================
          LEFT GOAL
      ===================================== */}

      <rect
        className="dpf-pitch-goal"
        x="72"
        y="170"
        width="28"
        height="60"
      />


      {/* LEFT GOAL NET GRID */}

      <line
        className="dpf-pitch-goal-net"
        x1="72"
        y1="180"
        x2="100"
        y2="180"
      />

      <line
        className="dpf-pitch-goal-net"
        x1="72"
        y1="200"
        x2="100"
        y2="200"
      />

      <line
        className="dpf-pitch-goal-net"
        x1="72"
        y1="220"
        x2="100"
        y2="220"
      />


      {/* =====================================
          RIGHT GOAL
      ===================================== */}

      <rect
        className="dpf-pitch-goal"
        x="900"
        y="170"
        width="28"
        height="60"
      />


      {/* RIGHT GOAL NET GRID */}

      <line
        className="dpf-pitch-goal-net"
        x1="900"
        y1="180"
        x2="928"
        y2="180"
      />

      <line
        className="dpf-pitch-goal-net"
        x1="900"
        y1="200"
        x2="928"
        y2="200"
      />

      <line
        className="dpf-pitch-goal-net"
        x1="900"
        y1="220"
        x2="928"
        y2="220"
      />

    </svg>


    {/* =====================================
        PLAYERS / DATA POINTS
    ===================================== */}

    <div className="dpf-hero__player p1" />
    <div className="dpf-hero__player p2" />
    <div className="dpf-hero__player p3" />
    <div className="dpf-hero__player p4" />
    <div className="dpf-hero__player p5" />
    <div className="dpf-hero__player p6" />
    <div className="dpf-hero__player p7" />
    <div className="dpf-hero__player p8" />
    <div className="dpf-hero__player p9" />
    <div className="dpf-hero__player p10" />
    <div className="dpf-hero__player p11" />

  </div>

</div>
      {/* LOWER SYSTEM LAYERS */}
      <div className="hero-layer hero-layer--analytics">
        DATA &amp; ANALYTICS
      </div>

      <div className="hero-layer hero-layer--infrastructure">
        INFRASTRUCTURE
      </div>

      {/* MODULE STACK */}
      <div className="hero-modules">

        {modules.map((module) => (
          <div
            className="hero-module"
            key={module.number}
          >
            <span className="hero-module__number">
              {module.number}
            </span>

            <div className="hero-module__content">
              <strong>{module.title}</strong>
              <small>{module.subtitle}</small>
            </div>
          </div>
        ))}

      </div>

    </div>
  );
}