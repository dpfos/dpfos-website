import "./CoreSystem.css";

const layers = [
  {
    number: "01",
    title: "Philosophy",
    description:
      "The principles that define how football is understood, designed and played.",
  },
  {
    number: "02",
    title: "Methodology",
    description:
      "The structures and processes that transform football principles into practice.",
  },
  {
    number: "03",
    title: "Game Model",
    description:
      "The operational model that translates philosophy and methodology into the game.",
  },
  {
    number: "04",
    title: "Performance",
    description:
      "The systems that develop, measure and continuously improve football performance.",
  },
  {
    number: "05",
    title: "Research",
    description:
      "The knowledge layer that enables evidence, experimentation and continuous evolution.",
  },
  {
    number: "06",
    title: "Development",
    description:
      "The pathway connecting players, coaches, education and long-term development.",
  },
];

export default function CoreSystem() {
  return (
    <section className="core-system">

      <div className="core-system-container">

        {/* HEADER */}

        <div className="core-system-header">

          <div className="core-system-label">
            DPF OS / CORE SYSTEM
          </div>

          <div className="core-system-heading">
            <h2>
              One Architecture.
              <br />
              Multiple Dimensions.
            </h2>

            <p>
              DPF OS connects the fundamental dimensions of football
              into one coherent operating architecture.
            </p>
          </div>

        </div>

        {/* CORE VISUAL */}

        <div className="core-system-visual">

          <div className="core-orbit orbit-one"></div>

          <div className="core-orbit orbit-two"></div>

          <div className="core-orbit orbit-three"></div>

          <div className="core-center">

            <span className="core-center-label">
              OPERATING
            </span>

            <strong>
              DPF OS
            </strong>

            <span className="core-center-subtitle">
              FOOTBALL SYSTEM
            </span>

          </div>

        </div>

        {/* SYSTEM LAYERS */}

        <div className="core-system-grid">

          {layers.map((layer) => (
            <article
              className="core-system-card"
              key={layer.number}
            >

              <span className="core-system-number">
                {layer.number}
              </span>

              <h3>
                {layer.title}
              </h3>

              <p>
                {layer.description}
              </p>

              <span className="core-system-arrow">
                →
              </span>

            </article>
          ))}

        </div>

      </div>

    </section>
  );
}
