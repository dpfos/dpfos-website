import { useTranslation } from "react-i18next";
import "./Architecture.css";

const dimensions = [
  {
    key: "philosophy",
  },
  {
    key: "methodology",
  },
  {
    key: "gameModel",
  },
  {
    key: "performance",
  },
  {
    key: "development",
  },
  {
    key: "research",
  },
];

export default function Architecture() {
  const { t } = useTranslation();

  return (
    <section className="architecture" id="architecture">
      <div className="architecture-container">

        {/* =====================================================
            HEADER
        ===================================================== */}

        <header className="architecture-header">

          <div className="architecture-label">
          <span>{t("architecture.header.label")}</span>
           </div>
           <div className="architecture-heading">

            <h2>
              {t("architecture.header.title.line1")}
              <br />
              {t("architecture.header.title.line2")}
            </h2>

            <p>
              {t("architecture.header.description")}
            </p>

          </div>

        </header>


        {/* =====================================================
            ARCHITECTURE SYSTEM
        ===================================================== */}

        <div className="architecture-system">

          {/* TOP TECHNICAL MARKERS */}

          <div className="architecture-system-meta">

            <span>
              {t("architecture.system.label")}
            </span>

            <div className="architecture-meta-line"></div>

            <span>
              {t("architecture.index")}
            </span>

          </div>


          {/* =================================================
              CORE
          ================================================= */}

          <div className="architecture-core-wrapper">

            <div className="architecture-orbit orbit-outer"></div>

            <div className="architecture-orbit orbit-middle"></div>

            <div className="architecture-orbit orbit-inner"></div>

            <div className="architecture-core-glow"></div>

            <div className="architecture-core">

              <span className="architecture-core-label">
                {t("architecture.core.label")}
              </span>

              <strong>
                {t("architecture.core.name")}
              </strong>

              <span className="architecture-core-subtitle">
                {t("architecture.core.subtitle")}
              </span>

            </div>

          </div>


          {/* =================================================
              CONNECTOR FIELD
          ================================================= */}

          <div className="architecture-connectors">

            <span className="connector connector-1"></span>

            <span className="connector connector-2"></span>

            <span className="connector connector-3"></span>

            <span className="connector connector-4"></span>

            <span className="connector connector-5"></span>

            <span className="connector connector-6"></span>

          </div>


          {/* =================================================
              DIMENSIONS
          ================================================= */}

          <div className="architecture-dimensions">

            {dimensions.map((dimension) => {

              const number = t(
                `architecture.dimensions.${dimension.key}.number`
              );

              return (
                <article
                  className={`architecture-dimension architecture-dimension-${number}`}
                  key={dimension.key}
                >

                  {/* DIMENSION TOP */}

                  <div className="dimension-top">

                    <span className="dimension-number">
                      {number}
                    </span>

                    <span className="dimension-category">
                      {t("architecture.dimensionLabel")}
                    </span>

                  </div>


                  {/* DIMENSION CONTENT */}

                  <div className="dimension-content">

                    <h3>
                      {t(
                        `architecture.dimensions.${dimension.key}.title`
                      )}
                    </h3>

                    <p>
                      {t(
                        `architecture.dimensions.${dimension.key}.description`
                      )}
                    </p>

                  </div>


                  {/* DIMENSION FOOTER */}

                  <div className="dimension-footer">

                    <span className="dimension-line"></span>

                    <span className="dimension-index">
                      {number}
                    </span>

                  </div>

                </article>
              );
            })}

          </div>

        </div>


        {/* =====================================================
            FOOTER
        ===================================================== */}

        <div className="architecture-footer">

          <div className="architecture-footer-status">

            <span className="status-dot"></span>

            <span>
              {t("architecture.footer.status")}
            </span>

          </div>


          <div className="architecture-footer-path">

            <span>
              {t("architecture.footer.core")}
            </span>

            <span>→</span>

            <span>
              {t("architecture.footer.dimensions")}
            </span>

            <span>→</span>

            <span>
              {t("architecture.footer.integration")}
            </span>

            <span>→</span>

            <span>
              {t("architecture.footer.evolution")}
            </span>

          </div>

        </div>

      </div>
    </section>
  );
}