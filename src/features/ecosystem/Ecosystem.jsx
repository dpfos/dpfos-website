import { useTranslation } from "react-i18next";
import "./Ecosystem.css";

const dimensions = [
  { number: "01", key: "philosophy" },
  { number: "02", key: "methodology" },
  { number: "03", key: "gameModel" },
  { number: "04", key: "coaching" },
  { number: "05", key: "performance" },
  { number: "06", key: "research" },
  { number: "07", key: "development" },
  { number: "08", key: "knowledge" },
];

export default function Ecosystem() {
  const { t } = useTranslation();

  return (
    <main className="eco-page">

      {/* HERO */}
      <section className="eco-hero">

        <div className="eco-label">
          {t("ecosystem.hero.label")}
        </div>

        <h1 className="eco-hero-title">
          <span className="eco-white">
            {t("ecosystem.hero.title.line1")}
          </span>

          <span className="eco-yellow">
            {t("ecosystem.hero.title.line2")}
          </span>
        </h1>

        <p className="eco-hero-text">
          {t("ecosystem.hero.description")}
        </p>

      </section>


      {/* CORE / ECOSYSTEM */}
      <section className="eco-core">

        <div className="eco-core-label">
          {t("ecosystem.core.label")}
        </div>


        {/* INTRO */}
        <div className="eco-core-intro">

          <div className="eco-core-heading">

            <h2>
              <span>
                {t("ecosystem.intro.title.line1")}
              </span>

              <strong>
                {t("ecosystem.intro.title.line2")}
              </strong>
            </h2>

          </div>


          <div className="eco-core-copy">

            <p>
              {t("ecosystem.intro.description")}
            </p>

          </div>

        </div>


        {/* MASTER ECOSYSTEM DIAGRAM */}
        <div className="eco-system">

          <div className="eco-system-meta">

            <span>
              {t("ecosystem.diagram.label")}
            </span>

            <span className="eco-system-meta-line"></span>

            <span>
              {t("ecosystem.diagram.index")}
            </span>

          </div>


          <div className="eco-diagram">

            {/* Orbits */}
            <div className="eco-orbit eco-orbit-outer"></div>
            <div className="eco-orbit eco-orbit-middle"></div>
            <div className="eco-orbit eco-orbit-inner"></div>


            {/* Connectors */}
            {dimensions.map((dimension) => (
              <div
                key={dimension.number}
                className={`eco-connector eco-connector-${dimension.number}`}
              />
            ))}


            {/* Center */}
            <div className="eco-core-node">

              <span className="eco-core-node-label">
                {t("ecosystem.diagram.core.label")}
              </span>

              <strong>
                DPF OS
              </strong>

              <span className="eco-core-node-subtitle">
                {t("ecosystem.diagram.core.subtitle")}
              </span>

            </div>


            {/* Dimension Nodes */}
            {dimensions.map((dimension) => (
              <article
                className={`eco-node eco-node-${dimension.number}`}
                key={dimension.number}
              >

                <span className="eco-node-number">
                  {dimension.number}
                </span>

                <h3>
                  {t(`ecosystem.dimensions.${dimension.key}.title`)}
                </h3>

                <span className="eco-node-stage">
                  {t(`ecosystem.dimensions.${dimension.key}.stage`)}
                </span>

                <span className="eco-node-dot"></span>

              </article>
            ))}

          </div>


          {/* Diagram Flow */}
          <div className="eco-system-flow">

            <span>
              {t("ecosystem.flow.understand")}
            </span>

            <b>→</b>

            <span>
              {t("ecosystem.flow.design")}
            </span>

            <b>→</b>

            <span>
              {t("ecosystem.flow.perform")}
            </span>

            <b>→</b>

            <span>
              {t("ecosystem.flow.evolve")}
            </span>

          </div>

        </div>


        {/* DIMENSION EXPLANATION */}
        <div className="eco-dimensions-header">

          <div className="eco-dimensions-label">
            {t("ecosystem.dimensionsHeader.label")}
          </div>

          <p>
            {t("ecosystem.dimensionsHeader.description")}
          </p>

        </div>


        {/* DIMENSION CARDS */}
        <div className="eco-cards">

          {dimensions.map((dimension) => (
            <article
              className="eco-card"
              key={dimension.number}
            >

              <span className="eco-card-number">
                {dimension.number}
              </span>


              <div className="eco-card-content">

                <h3>
                  {t(`ecosystem.dimensions.${dimension.key}.title`)}
                </h3>

                <p>
                  {t(`ecosystem.dimensions.${dimension.key}.description`)}
                </p>

              </div>


              <span className="eco-card-line"></span>

            </article>
          ))}

        </div>

      </section>

    </main>
  );
}