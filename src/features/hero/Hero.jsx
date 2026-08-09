import "./Hero.css";

import HeroBackground from "./HeroBackground";
import HeroContent from "./HeroContent";
import HeroActions from "./HeroActions";
import HeroStats from "./HeroStats";
import HeroVisual from "./HeroVisual";

export default function Hero() {
  return (
    <section className="hero" aria-label="DPF OS introduction">
      
      {/* =====================================================
          BACKGROUND SYSTEM
          -----------------------------------------------------
          Atmospheric grid, particles, glow and depth layers.
          This remains completely independent from the content.
      ====================================================== */}
      <HeroBackground />

      {/* =====================================================
          HERO INNER CONTAINER
      ====================================================== */}
      <div className="hero__container">

        {/* ===================================================
            LEFT SIDE
            ---------------------------------------------------
            Brand statement + description + actions + metrics
        ==================================================== */}
        <div className="hero__content">

          <HeroContent />

          <HeroActions />

          <HeroStats />

        </div>


        {/* ===================================================
            RIGHT SIDE
            ---------------------------------------------------
            DPF OS Core System visual.

            Architecture:

                CORE SYSTEM
                     │
                     │
                TACTICAL
                     │
                     │
                SPATIAL
                     │
                     │
                THE PITCH

            The visual is intentionally isolated inside one
            component so its geometry can be controlled from
            one coordinate system.
        ==================================================== */}
        <div className="hero__visual">

          <HeroVisual />

        </div>

      </div>


      {/* =====================================================
          SCROLL INDICATOR
      ====================================================== */}
      <div className="hero__scroll">

        <span className="hero__scroll-label">
          SCROLL TO EXPLORE
        </span>

        <span className="hero__scroll-arrow" aria-hidden="true">
          ↓
        </span>

      </div>

    </section>
  );
}