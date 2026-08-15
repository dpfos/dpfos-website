import "./Hero.css";
import HeroVisual from "./HeroVisual";

export default function Hero() {
  return (
    <section className="hero">

      <div className="hero-container">

        {/* =========================================
            LEFT
        ========================================= */}

        <div className="hero-left">

          <div className="hero-badge">
            <span className="hero-badge__dot" />
            DYNAMIC Test 999
          </div>

          <h1 className="hero-title">
            <span>The</span>
            <span>Operating</span>
            <span>System for</span>
            <span className="hero-title__accent">
              Football
            </span>
          </h1>

          <p className="hero-description">
            DPF OS is a complete football operating system integrating
            philosophy, methodology, coaching, performance, research,
            analytics and education into one unified ecosystem.
          </p>

          <div className="hero-actions">

            <a
              href="/platform"
              className="hero-button hero-button--primary"
            >
              <span>Explore Platform</span>
              <span>→</span>
            </a>

            <a
              href="/library"
              className="hero-button hero-button--secondary"
            >
              DPF Library
            </a>

          </div>

          <div className="hero-stats">

            <div className="hero-stat">
              <strong>10+</strong>
              <span>KNOWLEDGE</span>
              <span>VOLUMES</span>
            </div>

            <div className="hero-stat">
              <strong>100+</strong>
              <span>FRAMEWORKS &amp;</span>
              <span>CONCEPTS</span>
            </div>

            <div className="hero-stat">
              <strong>∞</strong>
              <span>SYSTEM</span>
              <span>EVOLUTION</span>
            </div>

          </div>

        </div>


        {/* =========================================
            RIGHT
        ========================================= */}

        <div className="hero-right">
          <HeroVisual />
        </div>

      </div>


      {/* =========================================
          SYSTEM STATUS
      ========================================= */}

      <div className="hero-status">
        <span className="hero-status__dot" />
        <span>SYSTEM ONLINE</span>
        <small>ALL MODULES SYNCHRONIZED</small>
      </div>

    </section>
  );
}