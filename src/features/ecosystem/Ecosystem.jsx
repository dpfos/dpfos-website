import "./Ecosystem.css";

const ecosystemItems = [
  {
    number: "01",
    title: "Philosophy",
    description:
      "The principles that define how football is understood, designed and played within the DPF framework.",
  },
  {
    number: "02",
    title: "Methodology",
    description:
      "The structures, processes and frameworks that transform football principles into repeatable practice.",
  },
  {
    number: "03",
    title: "Game Model",
    description:
      "The tactical architecture that translates DPF philosophy and methodology into collective football behavior.",
  },
  {
    number: "04",
    title: "Coaching",
    description:
      "The coaching system that connects the game model, training environment, learning and daily practice.",
  },
  {
    number: "05",
    title: "Performance",
    description:
      "The systems that develop, measure and continuously improve individual and collective football performance.",
  },
  {
    number: "06",
    title: "Research",
    description:
      "The knowledge layer that connects evidence, experimentation, analysis and continuous evolution.",
  },
  {
    number: "07",
    title: "Development",
    description:
      "The pathway connecting player development, coaching education, academy structures and long-term growth.",
  },
  {
    number: "08",
    title: "Knowledge",
    description:
      "A continuously evolving knowledge architecture connecting research, education, intelligence and football practice.",
  },
];

export default function Ecosystem() {
  return (
    <section className="ecosystem">
      <div className="ecosystem-container">

        {/* HEADER */}

        <div className="ecosystem-header">

          <div className="ecosystem-label">
            DPF OS / ECOSYSTEM
          </div>

          <div className="ecosystem-heading">
            <h2>
              One System.
              <br />
              Many Dimensions.
            </h2>

            <p>
              DPF OS connects the major dimensions of football into one
              integrated ecosystem where knowledge, methodology,
              performance and development operate together.
            </p>
          </div>

        </div>

        {/* CORE */}

        <div className="ecosystem-core">

          <div className="ecosystem-core-orbit orbit-one"></div>
          <div className="ecosystem-core-orbit orbit-two"></div>
          <div className="ecosystem-core-orbit orbit-three"></div>

          <div className="ecosystem-core-glow"></div>

          <div className="ecosystem-core-content">
            <span>CORE</span>

            <strong>DPF OS</strong>

            <small>FOOTBALL ECOSYSTEM</small>
          </div>

        </div>

        {/* GRID */}

        <div className="ecosystem-grid">

          {ecosystemItems.map((item) => (
            <div
              className="ecosystem-card"
              key={item.number}
            >

              <span className="ecosystem-number">
                {item.number}
              </span>

              <div className="ecosystem-card-content">

                <h3>{item.title}</h3>

                <p>{item.description}</p>

              </div>

              <span className="ecosystem-arrow">
                →
              </span>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}
