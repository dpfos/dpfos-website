const layers = [
  {
    number: "01",
    title: "GAME",
    subtitle: "Game Model · Principles · Logic",
    tone: "gold",
  },
  {
    number: "02",
    title: "TACTICAL",
    subtitle: "Structures · Behaviors · Playbook",
    tone: "gold",
  },
  {
    number: "03",
    title: "PLAYER",
    subtitle: "Roles · Development · Profiles",
    tone: "gold",
  },
  {
    number: "04",
    title: "COACHING",
    subtitle: "Training · Methodology · Practice",
    tone: "gold",
  },
  {
    number: "05",
    title: "PERFORMANCE",
    subtitle: "Monitoring · KPIs · Decision Support",
    tone: "cyan",
  },
  {
    number: "06",
    title: "INTELLIGENCE",
    subtitle: "Analytics · Research · Insights",
    tone: "cyan",
  },
  {
    number: "07",
    title: "KNOWLEDGE",
    subtitle: "Library · Principles · Frameworks",
    tone: "cyan",
  },
  {
    number: "08",
    title: "TECHNOLOGY",
    subtitle: "Platform · Infrastructure · Security",
    tone: "cyan",
  },
];

const stars = Array.from({ length: 42 }, (_, index) => ({
  left: `${(index * 43 + 7) % 100}%`,
  top: `${(index * 61 + 5) % 92}%`,
  size: index % 8 === 0 ? 2.4 : index % 3 === 0 ? 1.5 : 0.9,
  delay: `${-(index * 0.31).toFixed(2)}s`,
}));

const particles = [
  { x: "31%", y: "31%", tone: "cyan", size: "small" },
  { x: "42%", y: "25%", tone: "gold", size: "tiny" },
  { x: "55%", y: "29%", tone: "cyan", size: "small" },
  { x: "67%", y: "37%", tone: "cyan", size: "tiny" },
  { x: "73%", y: "49%", tone: "gold", size: "small" },
  { x: "27%", y: "51%", tone: "cyan", size: "tiny" },
  { x: "37%", y: "63%", tone: "gold", size: "small" },
  { x: "64%", y: "66%", tone: "cyan", size: "tiny" },
  { x: "48%", y: "72%", tone: "cyan", size: "small" },
  { x: "78%", y: "28%", tone: "gold", size: "tiny" },
];

/* -------------------------------------------------------
   HOLOGRAPHIC PITCH
------------------------------------------------------- */

function HolographicPitch() {
  return (
    <div className="dpf-holo-pitch">
      <div className="dpf-holo-pitch__aura" />

      <svg
        className="dpf-holo-pitch__svg"
        viewBox="0 0 700 430"
        aria-hidden="true"
      >
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
              stopColor="#00d9ff"
              stopOpacity="0.08"
            />
            <stop
              offset="48%"
              stopColor="#00d9ff"
              stopOpacity="0.025"
            />
            <stop
              offset="100%"
              stopColor="#d4af37"
              stopOpacity="0.08"
            />
          </linearGradient>

          <radialGradient
            id="dpfPitchCore"
            cx="50%"
            cy="50%"
            r="50%"
          >
            <stop
              offset="0%"
              stopColor="#00d9ff"
              stopOpacity="0.42"
            />
            <stop
              offset="100%"
              stopColor="#00d9ff"
              stopOpacity="0"
            />
          </radialGradient>

          <filter id="dpfSoftGlow">
            <feGaussianBlur stdDeviation="5" />
          </filter>
        </defs>

        {/* Main transparent surface */}
        <polygon
          points="145,45 555,45 640,385 60,385"
          fill="url(#dpfPitchSurface)"
        />

        {/* Outer boundary */}
        <polygon
          points="145,45 555,45 640,385 60,385"
          className="dpf-pitch-line"
        />

        {/* Vertical tactical corridors */}
        <line
          x1="235"
          y1="53"
          x2="255"
          y2="377"
          className="dpf-pitch-zone"
        />

        <line
          x1="315"
          y1="48"
          x2="320"
          y2="382"
          className="dpf-pitch-zone"
        />

        <line
          x1="385"
          y1="48"
          x2="380"
          y2="382"
          className="dpf-pitch-zone"
        />

        <line
          x1="465"
          y1="53"
          x2="445"
          y2="377"
          className="dpf-pitch-zone"
        />

        {/* Halfway line */}
        <line
          x1="350"
          y1="45"
          x2="350"
          y2="385"
          className="dpf-pitch-line"
        />

        {/* Center circle */}
        <ellipse
          cx="350"
          cy="215"
          rx="75"
          ry="50"
          className="dpf-pitch-line"
        />

        <ellipse
          cx="350"
          cy="215"
          rx="12"
          ry="8"
          className="dpf-pitch-line"
        />

        {/* Left penalty area */}
        <polygon
          points="145,125 225,125 242,305 60,305 60,125"
          className="dpf-pitch-line"
        />

        {/* Right penalty area */}
        <polygon
          points="555,125 475,125 458,305 640,305 640,125"
          className="dpf-pitch-line"
        />

        {/* Left goal area */}
        <polygon
          points="145,158 190,158 198,272 60,272 60,158"
          className="dpf-pitch-line"
        />

        {/* Right goal area */}
        <polygon
          points="555,158 510,158 502,272 640,272 640,158"
          className="dpf-pitch-line"
        />

        {/* Outer tactical grid */}
        <line
          x1="95"
          y1="95"
          x2="605"
          y2="95"
          className="dpf-pitch-grid"
        />

        <line
          x1="80"
          y1="165"
          x2="620"
          y2="165"
          className="dpf-pitch-grid"
        />

        <line
          x1="70"
          y1="250"
          x2="630"
          y2="250"
          className="dpf-pitch-grid"
        />

        <line
          x1="85"
          y1="330"
          x2="615"
          y2="330"
          className="dpf-pitch-grid"
        />

        {/* Data corridors */}
        <path
          d="M110 215 C180 170, 240 170, 350 215"
          className="dpf-pitch-data"
        />

        <path
          d="M590 215 C520 170, 460 170, 350 215"
          className="dpf-pitch-data"
        />

        <path
          d="M180 350 C250 285, 290 270, 350 215"
          className="dpf-pitch-data"
        />

        <path
          d="M520 350 C450 285, 410 270, 350 215"
          className="dpf-pitch-data"
        />

        {/* Central energy field */}
        <circle
          cx="350"
          cy="215"
          r="90"
          fill="url(#dpfPitchCore)"
          filter="url(#dpfSoftGlow)"
        />

        {/* Tactical nodes */}
        <g className="dpf-pitch-nodes">
          <circle cx="190" cy="145" r="4" />
          <circle cx="260" cy="180" r="3.5" />
          <circle cx="305" cy="125" r="3" />
          <circle cx="395" cy="125" r="3" />
          <circle cx="440" cy="180" r="3.5" />
          <circle cx="510" cy="145" r="4" />

          <circle cx="220" cy="285" r="3" />
          <circle cx="285" cy="305" r="3.5" />
          <circle cx="415" cy="305" r="3.5" />
          <circle cx="480" cy="285" r="3" />

          <circle cx="350" cy="215" r="5" />
        </g>
      </svg>
    </div>
  );
}

/* -------------------------------------------------------
   CENTRAL DPF CORE
------------------------------------------------------- */

function CoreEngine() {
  return (
    <div className="dpf-core-engine">
      <div className="dpf-core-engine__halo" />

      <div className="dpf-core-engine__orbit dpf-core-engine__orbit--one" />
      <div className="dpf-core-engine__orbit dpf-core-engine__orbit--two" />
      <div className="dpf-core-engine__orbit dpf-core-engine__orbit--three" />

      <div className="dpf-core-engine__energy">
        <span />
        <span />
        <span />
      </div>

      <div className="dpf-core-engine__point">
        <span />
      </div>

      <div className="dpf-core-engine__label">
        <strong>DPF OS</strong>
        <small>CORE ENGINE</small>
      </div>
    </div>
  );
}

/* -------------------------------------------------------
   ORBITAL SYSTEM
------------------------------------------------------- */

function OrbitalSystem() {
  return (
    <div className="dpf-orbital-system">
      <div className="dpf-orbital-system__ring dpf-orbital-system__ring--one">
        <span />
      </div>

      <div className="dpf-orbital-system__ring dpf-orbital-system__ring--two">
        <span />
      </div>

      <div className="dpf-orbital-system__ring dpf-orbital-system__ring--three">
        <span />
      </div>

      <div className="dpf-orbital-system__ring dpf-orbital-system__ring--four">
        <span />
      </div>
    </div>
  );
}

/* -------------------------------------------------------
   FLOATING ARCHITECTURE
------------------------------------------------------- */

function FloatingArchitecture() {
  return (
    <div className="dpf-floating-architecture">
      {layers.map((layer, index) => (
        <div
          key={layer.number}
          className={`dpf-floating-layer dpf-floating-layer--${layer.tone}`}
          style={{
            "--layer-index": index,
          }}
        >
          <span className="dpf-floating-layer__signal" />

          <span className="dpf-floating-layer__number">
            {layer.number}
          </span>

          <div className="dpf-floating-layer__text">
            <strong>{layer.title}</strong>
            <small>{layer.subtitle}</small>
          </div>
        </div>
      ))}
    </div>
  );
}

/* -------------------------------------------------------
   SPACE PARTICLES
------------------------------------------------------- */

function SpaceParticles() {
  return (
    <div className="dpf-space-particles" aria-hidden="true">
      {stars.map((star, index) => (
        <i
          key={index}
          style={{
            left: star.left,
            top: star.top,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDelay: star.delay,
          }}
        />
      ))}

      {particles.map((particle, index) => (
        <span
          key={`particle-${index}`}
          className={`dpf-data-particle dpf-data-particle--${particle.tone} dpf-data-particle--${particle.size}`}
          style={{
            left: particle.x,
            top: particle.y,
            animationDelay: `${index * -0.7}s`,
          }}
        />
      ))}
    </div>
  );
}

/* -------------------------------------------------------
   MAIN VISUAL
------------------------------------------------------- */

export default function HeroVisual() {
  return (
    <div className="dpf-hero-visual">
      <SpaceParticles />

      <div className="dpf-hero-visual__atmosphere" />

      <div className="dpf-hero-visual__architecture">

        <div className="dpf-hero-visual__axis" />

        <div className="dpf-hero-visual__label">
          <strong>DPF OS</strong>
          <small>SYSTEM ARCHITECTURE</small>
        </div>

        <HolographicPitch />

        <OrbitalSystem />

        <CoreEngine />

        <FloatingArchitecture />

      </div>

      <div className="dpf-hero-visual__floor">
        <div className="dpf-hero-visual__floor-grid" />
        <div className="dpf-hero-visual__floor-glow" />
      </div>

      <div className="dpf-hero-visual__status">
        <span />
        SYSTEM ONLINE
      </div>
    </div>
  );
}