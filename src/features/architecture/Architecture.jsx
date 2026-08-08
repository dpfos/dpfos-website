import "./Architecture.css";

const layers = [
  {
    number: "01",
    title: "Strategic Layer",
    description:
      "Defines the direction, identity, principles and long-term architecture of the football environment.",
  },
  {
    number: "02",
    title: "Methodological Layer",
    description:
      "Transforms strategic principles into repeatable methodologies, frameworks and operating processes.",
  },
  {
    number: "03",
    title: "Operational Layer",
    description:
      "Connects coaching, game model, player development and performance into daily football practice.",
  },
  {
    number: "04",
    title: "Intelligence Layer",
    description:
      "Integrates research, analysis, data and knowledge into continuous decision-making and evolution.",
  },
];

export default function Architecture() {
  return (
    <section className="architecture">

      <div className="architecture-container">

        <div className="architecture-header">

          <div className="architecture-label">
            DPF OS / SYSTEM ARCHITECTURE
          </div>

          <div className="architecture-heading">

            <h2>
              Designed as a
              <br />
              Living System.
            </h2>

            <p>
              DPF OS is structured as a layered architecture where
              strategic direction, methodology, operations and
              intelligence continuously interact.
            </p>

          </div>

        </div>

        <div className="architecture-flow">

          <div className="architecture-core">

            <span>CORE</span>

            <strong>DPF OS</strong>

            <small>OPERATING SYSTEM</small>

          </div>

          <div className="architecture-line"></div>

          <div className="architecture-layers">

            {layers.map((layer) => (
              <article
                className="architecture-layer"
                key={layer.number}
              >

                <span className="architecture-number">
                  {layer.number}
                </span>

                <div className="architecture-layer-content">

                  <h3>{layer.title}</h3>

                  <p>{layer.description}</p>

                </div>

                <span className="architecture-arrow">
                  →
                </span>

              </article>
            ))}

          </div>

        </div>

      </div>

    </section>
  );
}
