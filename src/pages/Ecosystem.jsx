import "./Ecosystem.css";

export default function Ecosystem() {
  return (
    <main className="eco-page">

      {/* HERO */}
      <section className="eco-hero">
        <div className="eco-label">
          DPF OPERATING SYSTEM
        </div>

        <h1 className="eco-hero-title">
          <span className="eco-white">One Ecosystem.</span>
          <span className="eco-yellow">
            One Football Architecture.
          </span>
        </h1>

        <p className="eco-hero-text">
          DPF OS connects the knowledge, people, processes and technologies
          required to design, develop and continuously evolve modern football.
        </p>
      </section>


      {/* CORE */}
      <section className="eco-core">

        <div className="eco-core-label">
          DPF OS ECOSYSTEM
        </div>

        <div className="eco-core-intro">

          <div className="eco-core-heading">
            <h2>
              <span>Everything connected.</span>
              <strong>Nothing isolated.</strong>
            </h2>
          </div>

          <div className="eco-core-copy">
            <p>
              DPF OS creates a unified environment where philosophy,
              methodology, coaching, performance, research, education and
              technology operate as interconnected parts of one system.
            </p>
          </div>

        </div>


        {/* CARDS */}
        <div className="eco-cards">

          <article className="eco-card">
            <span className="eco-card-number">01</span>
            <h3>Knowledge</h3>
            <p>
              The intellectual foundation of the DPF OS and its football
              operating principles.
            </p>
          </article>

          <article className="eco-card">
            <span className="eco-card-number">02</span>
            <h3>Methodology</h3>
            <p>
              Frameworks that transform knowledge and principles into
              repeatable football processes.
            </p>
          </article>

          <article className="eco-card">
            <span className="eco-card-number">03</span>
            <h3>People</h3>
            <p>
              Coaches, players, analysts, leaders and practitioners operating
              within the same architecture.
            </p>
          </article>

          <article className="eco-card">
            <span className="eco-card-number">04</span>
            <h3>Performance</h3>
            <p>
              Systems for measuring, understanding and continuously improving
              football performance.
            </p>
          </article>

          <article className="eco-card">
            <span className="eco-card-number">05</span>
            <h3>Research</h3>
            <p>
              Continuous learning, experimentation and knowledge generation
              across the football environment.
            </p>
          </article>

          <article className="eco-card">
            <span className="eco-card-number">06</span>
            <h3>Technology</h3>
            <p>
              Digital infrastructure connecting information, analysis,
              workflows and decision-making.
            </p>
          </article>

        </div>

      </section>

    </main>
  );
}