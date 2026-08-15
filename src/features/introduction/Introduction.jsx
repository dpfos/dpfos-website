import "./Introduction.css";
import { useTranslation } from "react-i18next";

export default function Introduction() {
  const { t } = useTranslation();

  return (
    <section className="introduction">
      <div className="introduction-container">

        {/* HEADER */}

        <div className="introduction-header">

          <span className="introduction-label">
            {t("home.introduction.label")}
          </span>

          <h2>
            {t("home.introduction.title.line1")}
            <br />
            {t("home.introduction.title.line2")}
            <br />
            {t("home.introduction.title.line3")}
          </h2>

        </div>

        {/* CONTENT */}

        <div className="introduction-content">

          <div className="introduction-lead">
            <p>
              {t("home.introduction.lead")}
            </p>
          </div>

          <div className="introduction-description">

            <p>
              {t("home.introduction.description.paragraph1")}
            </p>

            <p>
              {t("home.introduction.description.paragraph2")}
            </p>

          </div>

        </div>

        {/* SYSTEM FLOW */}

        <div className="introduction-flow">

          <div className="introduction-flow-item">
            <span className="introduction-flow-number">01</span>

            <div>
              <strong>
                {t("home.introduction.flow.understand.title")}
              </strong>

              <small>
                {t("home.introduction.flow.understand.subtitle")}
              </small>
            </div>
          </div>

          <div className="introduction-flow-line" />

          <div className="introduction-flow-item">
            <span className="introduction-flow-number">02</span>

            <div>
              <strong>
                {t("home.introduction.flow.design.title")}
              </strong>

              <small>
                {t("home.introduction.flow.design.subtitle")}
              </small>
            </div>
          </div>

          <div className="introduction-flow-line" />

          <div className="introduction-flow-item">
            <span className="introduction-flow-number">03</span>

            <div>
              <strong>
                {t("home.introduction.flow.perform.title")}
              </strong>

              <small>
                {t("home.introduction.flow.perform.subtitle")}
              </small>
            </div>
          </div>

          <div className="introduction-flow-line" />

          <div className="introduction-flow-item">
            <span className="introduction-flow-number">04</span>

            <div>
              <strong>
                {t("home.introduction.flow.evolve.title")}
              </strong>

              <small>
                {t("home.introduction.flow.evolve.subtitle")}
              </small>
            </div>
          </div>

        </div>

        {/* SYSTEM PILLARS */}

        <div className="introduction-grid">

          <div className="introduction-card">
            <span className="introduction-number">01</span>

            <h3>
              {t("home.introduction.pillars.philosophy.title")}
            </h3>

            <p>
              {t("home.introduction.pillars.philosophy.description")}
            </p>
          </div>

          <div className="introduction-card">
            <span className="introduction-number">02</span>

            <h3>
              {t("home.introduction.pillars.methodology.title")}
            </h3>

            <p>
              {t("home.introduction.pillars.methodology.description")}
            </p>
          </div>

          <div className="introduction-card">
            <span className="introduction-number">03</span>

            <h3>
              {t("home.introduction.pillars.performance.title")}
            </h3>

            <p>
              {t("home.introduction.pillars.performance.description")}
            </p>
          </div>

          <div className="introduction-card">
            <span className="introduction-number">04</span>

            <h3>
              {t("home.introduction.pillars.knowledge.title")}
            </h3>

            <p>
              {t("home.introduction.pillars.knowledge.description")}
            </p>
          </div>

        </div>

        {/* FOOTER */}

        <div className="introduction-footer">

          <span>
            {t("home.introduction.footer.status")}
          </span>

          <div>
            <span>
              {t("home.introduction.footer.understand")}
            </span>

            <span>→</span>

            <span>
              {t("home.introduction.footer.design")}
            </span>

            <span>→</span>

            <span>
              {t("home.introduction.footer.perform")}
            </span>

            <span>→</span>

            <span>
              {t("home.introduction.footer.evolve")}
            </span>
          </div>

        </div>

      </div>
    </section>
  );
}