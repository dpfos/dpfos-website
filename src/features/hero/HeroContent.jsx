export default function HeroContent() {
  return (
    <div className="hero-content">

      {/* =====================================================
          SYSTEM EYEBROW
          -----------------------------------------------------
          Identifies the DPF OS category before the main
          statement.
      ====================================================== */}

      <div className="hero-eyebrow">

        <span className="hero-eyebrow__indicator" />

        <span className="hero-eyebrow__text">
          DYNAMIC POSITIONAL FOOTBALL OPERATING SYSTEM
        </span>

      </div>


      {/* =====================================================
          PRIMARY HERO STATEMENT
          -----------------------------------------------------
          The main brand statement.

          Typography hierarchy:

          The
          Operating
          System for
          Football
      ====================================================== */}

      <h1 className="hero-title">

        <span className="hero-title__line">
          The
        </span>

        <span className="hero-title__line">
          Operating
        </span>

        <span className="hero-title__line">
          System for
        </span>

        <span className="hero-title__line hero-title__line--accent">
          Football
        </span>

      </h1>


      {/* =====================================================
          SYSTEM DESCRIPTION
          -----------------------------------------------------
          Short explanation of what DPF OS actually is.
      ====================================================== */}

      <p className="hero-description">
        DPF OS is a complete football operating system integrating
        philosophy, methodology, coaching, performance, research,
        analytics and education into one unified ecosystem.
      </p>

    </div>
  );
}