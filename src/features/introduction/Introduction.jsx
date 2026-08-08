import "./Introduction.css";

export default function Introduction() {
  return (
    <section className="introduction">

      <div className="introduction-container">

        {/* HEADER */}

        <div className="introduction-header">

          <span className="introduction-label">
            DPF OS / SYSTEM OVERVIEW
          </span>

          <h2>
            One System.
            <br />
            One Football
            <br />
            Architecture.
          </h2>

        </div>

        {/* CONTENT */}

        <div className="introduction-content">

          <div className="introduction-lead">

            <p>
              DPF OS is a unified operating system designed to structure,
              connect and continuously evolve every dimension of modern
              football.
            </p>

          </div>

          <div className="introduction-description">

            <p>
              From football philosophy and methodology to coaching,
              performance, research, analytics and player development,
              DPF OS creates a common architecture where knowledge,
              processes and decisions operate as one integrated system.
            </p>

            <p>
              Instead of treating football as disconnected departments,
              DPF OS establishes a coherent operating model that allows
              every part of the football environment to communicate,
              evolve and perform within the same framework.
            </p>

          </div>

        </div>

        {/* SYSTEM PILLARS */}

        <div className="introduction-grid">

          <div className="introduction-card">

            <span className="introduction-number">
              01
            </span>

            <h3>
              Philosophy
            </h3>

            <p>
              The principles that define how the game is understood,
              designed and played.
            </p>

          </div>

          <div className="introduction-card">

            <span className="introduction-number">
              02
            </span>

            <h3>
              Methodology
            </h3>

            <p>
              The structures and processes that transform principles
              into repeatable football practice.
            </p>

          </div>

          <div className="introduction-card">

            <span className="introduction-number">
              03
            </span>

            <h3>
              Performance
            </h3>

            <p>
              The systems that connect development, performance,
              analysis and continuous improvement.
            </p>

          </div>

          <div className="introduction-card">

            <span className="introduction-number">
              04
            </span>

            <h3>
              Knowledge
            </h3>

            <p>
              A continuously evolving knowledge architecture connecting
              research, education and football intelligence.
            </p>

          </div>

        </div>

      </div>

    </section>
  );
}
