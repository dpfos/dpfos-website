import "./Platform.css";

export default function Platform() {
  return (
    <main className="platform-page">

      {/* HERO */}
      <section className="platform-hero">
        <div className="platform-hero-inner">

          <div className="platform-eyebrow">
            DPF OPERATING SYSTEM
          </div>

          <h1>
            The Operating
            <br />
            Architecture
            <br />
            <span>for Modern Football.</span>
          </h1>

          <p>
            DPF OS is a unified operating architecture for designing,
            developing, managing and continuously evolving football
            environments.
          </p>

        </div>
      </section>


      {/* CORE ARCHITECTURE */}
      <section className="architecture-section">

        <div className="section-heading">
          <span>01</span>

          <div>
            <div className="section-eyebrow">
              DPF OS CORE ARCHITECTURE
            </div>

            <h2>
              One System.
              <br />
              Multiple Operating Layers.
            </h2>

            <p>
              DPF OS connects the essential dimensions of football
              through one coherent architecture, allowing every layer
              to communicate, operate and evolve within the same system.
            </p>
          </div>
        </div>


        <div className="architecture-grid">

          <article className="architecture-card featured">
            <span className="card-number">01</span>
            <h3>Philosophy</h3>
            <p>
              The principles that define how football is understood,
              designed and played.
            </p>
          </article>


          <article className="architecture-card">
            <span className="card-number">02</span>
            <h3>Methodology</h3>
            <p>
              The framework that transforms principles into repeatable
              processes, practices and decisions.
            </p>
          </article>


          <article className="architecture-card">
            <span className="card-number">03</span>
            <h3>Game Model</h3>
            <p>
              The football logic that organizes collective behavior,
              relationships, spaces and actions.
            </p>
          </article>


          <article className="architecture-card">
            <span className="card-number">04</span>
            <h3>Coaching</h3>
            <p>
              The operational layer responsible for translating the
              system into learning, training and performance.
            </p>
          </article>


          <article className="architecture-card">
            <span className="card-number">05</span>
            <h3>Performance</h3>
            <p>
              The systems used to understand, measure and continuously
              improve individual and collective performance.
            </p>
          </article>


          <article className="architecture-card">
            <span className="card-number">06</span>
            <h3>Research & Education</h3>
            <p>
              The knowledge layer that allows the system to learn,
              evolve and generate new football intelligence.
            </p>
          </article>

        </div>

      </section>


      {/* SYSTEM LOGIC */}
      <section className="system-section">

        <div className="system-content">

          <div className="section-eyebrow">
            SYSTEM LOGIC
          </div>

          <h2>
            Football is not a collection
            <br />
            of disconnected departments.
          </h2>

          <p>
            DPF OS establishes a common operating architecture where
            philosophy, methodology, coaching, performance, research,
            analytics and development operate as connected components
            of one football system.
          </p>

        </div>


        <div className="system-flow">

          <div className="flow-node">
            <strong>01</strong>
            <span>Understand</span>
          </div>

          <div className="flow-line" />

          <div className="flow-node">
            <strong>02</strong>
            <span>Design</span>
          </div>

          <div className="flow-line" />

          <div className="flow-node">
            <strong>03</strong>
            <span>Develop</span>
          </div>

          <div className="flow-line" />

          <div className="flow-node">
            <strong>04</strong>
            <span>Measure</span>
          </div>

          <div className="flow-line" />

          <div className="flow-node">
            <strong>05</strong>
            <span>Evolve</span>
          </div>

        </div>

      </section>


      {/* CLOSING */}
      <section className="platform-closing">

        <div className="closing-eyebrow">
          DPF OS
        </div>

        <h2>
          One Football.
          <br />
          <span>One Operating System.</span>
        </h2>

        <p>
          A living architecture designed to structure knowledge,
          connect decisions and continuously evolve the football
          environment.
        </p>

      </section>

    </main>
  );
}