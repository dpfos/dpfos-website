export default function HeroActions() {
  return (
    <div className="hero-actions">

      {/* =====================================================
          PRIMARY ACTION
          -----------------------------------------------------
          Main entry point into the DPF OS platform.
      ====================================================== */}

      <a
        href="/platform"
        className="hero-action hero-action--primary"
        aria-label="Explore the DPF OS platform"
      >
        <span className="hero-action__label">
          Explore Platform
        </span>

        <span
          className="hero-action__arrow"
          aria-hidden="true"
        >
          →
        </span>
      </a>


      {/* =====================================================
          SECONDARY ACTION
          -----------------------------------------------------
          Direct access to the DPF OS Knowledge Library.
      ====================================================== */}

      <a
        href="/library"
        className="hero-action hero-action--secondary"
        aria-label="Open the DPF OS Knowledge Library"
      >
        <span className="hero-action__label">
          DPF Library
        </span>
      </a>

    </div>
  );
}