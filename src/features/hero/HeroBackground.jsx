export default function HeroBackground() {
  return (
    <div className="hero-background" aria-hidden="true">

      {/* =====================================================
          DEEP SPACE ATMOSPHERE
      ====================================================== */}

      <div className="hero-background__glow hero-background__glow--left" />

      <div className="hero-background__glow hero-background__glow--core" />

      <div className="hero-background__glow hero-background__glow--bottom" />


      {/* =====================================================
          TECHNICAL GRID
          -----------------------------------------------------
          A very subtle architectural grid.

          It establishes the DPF environment without competing
          with the football-system visual.
      ====================================================== */}

      <div className="hero-background__grid" />


      {/* =====================================================
          DEPTH VIGNETTE
          -----------------------------------------------------
          Keeps the center readable and pushes the edges
          visually backward.
      ====================================================== */}

      <div className="hero-background__vignette" />


      {/* =====================================================
          AMBIENT PARTICLES
          -----------------------------------------------------
          Small points of light create the deep-space /
          computational environment.
      ====================================================== */}

      <span className="hero-background__particle hero-background__particle--01" />
      <span className="hero-background__particle hero-background__particle--02" />
      <span className="hero-background__particle hero-background__particle--03" />
      <span className="hero-background__particle hero-background__particle--04" />
      <span className="hero-background__particle hero-background__particle--05" />
      <span className="hero-background__particle hero-background__particle--06" />
      <span className="hero-background__particle hero-background__particle--07" />
      <span className="hero-background__particle hero-background__particle--08" />
      <span className="hero-background__particle hero-background__particle--09" />
      <span className="hero-background__particle hero-background__particle--10" />


      {/* =====================================================
          HORIZONTAL SYSTEM LINES
          -----------------------------------------------------
          Very faint technical lines that visually connect
          the left textual system with the right visual system.
      ====================================================== */}

      <div className="hero-background__system-line hero-background__system-line--01" />
      <div className="hero-background__system-line hero-background__system-line--02" />
      <div className="hero-background__system-line hero-background__system-line--03" />

    </div>
  );
}