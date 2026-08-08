import "./Research.css";

export default function Research() {
  return (
    <section className="research">
      <div className="research-container">

        {/* HEADER */}
        <div className="research-header">

          <div className="research-label">
            DPF OS / RESEARCH & INTELLIGENCE
          </div>

          <h2>
            Research That
            <br />
            Evolves the
            <br />
            System.
          </h2>

          <p className="research-intro">
            DPF OS treats research as a living layer of the operating
            system, continuously transforming evidence, experimentation
            and football intelligence into better decisions.
          </p>

        </div>

        {/* RESEARCH CORE */}
        <div className="research-core">

          <div className="research-core-visual">
            <div className="research-orbit orbit-one"></div>
            <div className="research-orbit orbit-two"></div>
            <div className="research-orbit orbit-three"></div>

            <div className="research-core-node">
              <span>RESEARCH</span>
              <strong>DPF OS</strong>
              <small>INTELLIGENCE LAYER</small>
            </div>
          </div>

          <div className="research-core-content">

            <span className="research-eyebrow">
              THE INTELLIGENCE LAYER
            </span>

            <h3>
              Evidence becomes
              <br />
              football intelligence.
            </h3>

            <p>
              Research within DPF OS connects scientific evidence,
              football observation, experimentation, analytics and
              applied learning into a continuously evolving knowledge
              architecture.
            </p>

            <p>
              The objective is not simply to collect information.
              It is to transform knowledge into principles, decisions,
              practices and systems that improve the football
              environment.
            </p>

          </div>

        </div>

        {/* RESEARCH PILLARS */}
        <div className="research-grid">

          <div className="research-card">
            <span className="research-number">01</span>

            <h3>Evidence</h3>

            <p>
              Scientific research, validated knowledge and relevant
              evidence that strengthen football decision-making.
            </p>

            <span className="research-arrow">→</span>
          </div>

          <div className="research-card">
            <span className="research-number">02</span>

            <h3>Experimentation</h3>

            <p>
              Controlled exploration of ideas, methods and practices
              before they become part of the operating system.
            </p>

            <span className="research-arrow">→</span>
          </div>

          <div className="research-card">
            <span className="research-number">03</span>

            <h3>Analytics</h3>

            <p>
              Data and performance intelligence used to understand
              patterns, evaluate decisions and reveal opportunities.
            </p>

            <span className="research-arrow">→</span>
          </div>

          <div className="research-card">
            <span className="research-number">04</span>

            <h3>Intelligence</h3>

            <p>
              The synthesis of evidence, observation and experience
              into actionable football knowledge.
            </p>

            <span className="research-arrow">→</span>
          </div>

        </div>

        {/* BOTTOM STATEMENT */}
        <div className="research-footer">

          <span>CONTINUOUS EVOLUTION</span>

          <h3>
            Research does not sit outside
            <br />
            the system.
            <br />
            It evolves the system.
          </h3>

        </div>

      </div>
    </section>
  );
}
