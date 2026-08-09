import "./Hero.css";

export default function Hero() {
  return (
    <section className="hero">

      <div className="hero-container">

        {/* =========================
            HERO LEFT
        ========================= */}

        <div className="hero-left">

          <div className="hero-badge">
            Dynamic Positional Football Operating System
          </div>

          <h1 className="hero-title">
            The
            <br />
            Operating
            <br />
            System for
            <br />
            Football
          </h1>

          <p className="hero-description">
            DPF OS is a complete football operating system integrating
            philosophy, methodology, coaching, performance, research,
            analytics and education into one unified ecosystem.
          </p>

          <div className="hero-actions">

            <a
              href="/platform"
              className="hero-button hero-button-primary"
            >
              Explore Platform
            </a>

            <a
              href="/library"
              className="hero-button hero-button-secondary"
            >
              DPF Library
            </a>

          </div>

          <div className="hero-stats">

            <div className="hero-stat">
              <h3>10+</h3>
              <span>Knowledge Volumes</span>
            </div>

            <div className="hero-stat">
              <h3>100+</h3>
              <span>Frameworks &amp; Concepts</span>
            </div>

            <div className="hero-stat">
              <h3>∞</h3>
              <span>System Evolution</span>
            </div>

          </div>

        </div>


        {/* =========================
            HERO RIGHT
        ========================= */}

        <div className="hero-right">

          <div className="football-system">

            {/* =========================
                FOOTBALL PITCH
            ========================= */}

            <div className="pitch-grid">

              <div className="pitch-line pitch-horizontal pitch-top" />
              <div className="pitch-line pitch-horizontal pitch-middle" />
              <div className="pitch-line pitch-horizontal pitch-bottom" />

              <div className="pitch-line pitch-vertical pitch-left" />
              <div className="pitch-line pitch-vertical pitch-center" />
              <div className="pitch-line pitch-vertical pitch-right" />

              <div className="center-circle" />
              <div className="center-point" />

              <div className="penalty-box penalty-left" />
              <div className="penalty-box penalty-right" />

            </div>


            {/* =========================
                ORBITAL SYSTEM
            ========================= */}

            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <div className="orbit orbit-three" />


            {/* =========================
                DPF CORE
            ========================= */}

            <div className="dpf-core">

              <div className="core-glow" />

              <span className="core-label">
                DPF OS
              </span>

              <span className="core-subtitle">
                FOOTBALL OPERATING SYSTEM
              </span>

            </div>


            {/* =========================
                FOOTBALL
            ========================= */}

            <div className="football-node">

              <div className="football-ball">
                ⚽
              </div>

            </div>


            {/* =========================
                POSITIONAL NODES
            ========================= */}

            <div className="position-node node-one" />
            <div className="position-node node-two" />
            <div className="position-node node-three" />
            <div className="position-node node-four" />
            <div className="position-node node-five" />

          </div>

        </div>

      </div>

    </section>
  );
}